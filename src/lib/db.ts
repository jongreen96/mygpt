import { PrismaClient } from '@prisma/client';
import { Attachment, Message } from 'ai';
import generateSubject from './hooks/generate-subject';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// -------------------- Queries -------------------- \\
export async function createConversation({
  userId,
  messages,
  model,
}: {
  userId: string;
  messages: { role: string; content: string }[];
  model: string;
}) {
  const subject = await generateSubject(messages);

  const newConversation = await prisma.conversation.create({
    data: { userId, subject: subject, model },
    select: { id: true },
  });

  return newConversation.id;
}

export async function deleteConversation(conversationId: string) {
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { deleted: new Date().toISOString() },
  });

  await prisma.message.updateMany({
    where: { conversationId, deleted: null },
    data: { deleted: new Date().toISOString() },
  });
}

export async function getConversation(
  conversationId: string,
  userId: string | undefined,
) {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId, userId, deleted: null },
    select: {
      id: true,
      subject: true,
      model: true,
      Message: {
        select: {
          id: true,
          content: true,
          role: true,
          experimental_attachments: true,
        },
        where: { conversationId: conversationId, deleted: null },
        orderBy: { id: 'asc' },
      },
    },
  });

  if (!conversation) return null;

  const transformedConversation = {
    ...conversation,
    Message: conversation.Message.map((message) => ({
      ...message,
      id: String(message.id),
      content: message.content || '',
      role: message.role as 'user' | 'assistant',
      experimental_attachments:
        message.experimental_attachments as unknown as Attachment[],
    })),
  };

  return transformedConversation;
}

export async function getConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: { userId, deleted: null },
    select: {
      id: true,
      subject: true,
      model: true,
      Message: {
        where: { deleted: null },
        select: { role: true, tokens: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return conversations.map((conv) => ({
    id: conv.id,
    subject: conv.subject,
    model: conv.model,
    usage: {
      inputTokens: conv.Message.filter((m) => m.role === 'user').reduce(
        (sum, m) => sum + (m.tokens || 0),
        0,
      ),
      outputTokens: conv.Message.filter((m) => m.role === 'assistant').reduce(
        (sum, m) => sum + (m.tokens || 0),
        0,
      ),
    },
  }));
}

export async function saveMessages({
  conversationId,
  userMessage,
  assistantMessage,
  usage,
}: {
  conversationId: string;
  userMessage: Message;
  assistantMessage: {
    content: string | undefined;
    experimental_attachments?: Attachment[];
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}) {
  await prisma.message.createMany({
    data: [
      {
        conversationId,
        content: userMessage.content,
        experimental_attachments: userMessage.experimental_attachments
          ? JSON.parse(JSON.stringify(userMessage.experimental_attachments))
          : undefined,
        role: 'user',
        tokens: usage.promptTokens,
      },
      {
        conversationId,
        content: assistantMessage.content,
        experimental_attachments: assistantMessage.experimental_attachments
          ? JSON.parse(
              JSON.stringify(assistantMessage.experimental_attachments),
            )
          : undefined,
        role: 'assistant',
        tokens: usage.completionTokens,
      },
    ],
  });

  return conversationId;
}

export async function deleteMessage(
  messageId: number,
  conversationId?: string,
) {
  if (conversationId) {
    deleteConversation(conversationId);
  } else {
    await prisma.message.update({
      where: { id: messageId },
      data: { deleted: new Date().toISOString() },
    });
  }
}

export async function addCredits(userId: string, credits: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: credits } },
  });
}

export async function chargeUser({
  userId,
  cost,
}: {
  userId: string;
  cost: number;
}) {
  const profit = 1.5; // 50% profit margin

  await prisma.user.update({
    where: { id: userId },
    data: { credits: { decrement: Math.ceil(cost * profit * 100_000) } },
  });
}

export async function logTransaction(userId: string, pricePaidInCents: number) {
  await prisma.transactions.create({ data: { userId, pricePaidInCents } });
}

export async function getAdminStats() {
  const [
    users,
    transactionCount,
    totalCredits,
    totalTransactions,
    messageCount,
    inputTokens,
    outputTokens,
    conversationCount,
  ] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        credits: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.transactions.count(),
    prisma.user.aggregate({
      _sum: { credits: true },
      where: { email: { not: 'jongreen1996@gmail.com' } },
    }),
    prisma.transactions.aggregate({ _sum: { pricePaidInCents: true } }),
    prisma.message.count({ where: { deleted: null } }),
    prisma.message.aggregate({
      where: { role: 'user', deleted: null },
      _sum: { tokens: true },
    }),
    prisma.message.aggregate({
      where: { role: 'assistant', deleted: null },
      _sum: { tokens: true },
    }),
    prisma.conversation.count({ where: { deleted: null } }),
  ]);

  return {
    users,
    stats: {
      totalMessages: messageCount,
      totalInputTokens: inputTokens._sum.tokens || 0,
      totalOutputTokens: outputTokens._sum.tokens || 0,
      totalConversations: conversationCount,
    },
    transactionCount,
    totalCredits: totalCredits._sum.credits || 0,
    totalRevenue: (totalTransactions._sum.pricePaidInCents || 0) / 100,
  };
}
