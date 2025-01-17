import { PrismaClient } from '@prisma/client';
import { ModelSettingsType } from './ai-models';
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
  modelSettings,
}: {
  userId: string;
  messages: { role: string; content: string }[];
  modelSettings: ModelSettingsType;
}) {
  const subject = await generateSubject(messages);

  const newConversation = await prisma.conversation.create({
    data: {
      userId,
      subject: subject,
      settings: JSON.stringify(modelSettings),
    },
    select: {
      id: true,
    },
  });

  return newConversation.id;
}

export async function deleteConversation(conversationId: string) {
  await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      deleted: new Date().toISOString(),
    },
  });

  await prisma.message.updateMany({
    where: {
      conversationId,
      deleted: null,
    },
    data: {
      deleted: new Date().toISOString(),
    },
  });
}

export async function getConversation(
  conversationId: string,
  userId: string | undefined,
) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
      userId,
      deleted: null,
    },
    select: {
      id: true,
      subject: true,
      settings: true,
      Message: {
        select: {
          id: true,
          content: true,
          role: true,
          attachments: true,
        },
        where: {
          conversationId: conversationId,
          deleted: null,
        },
        orderBy: {
          id: 'asc',
        },
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
    })),
  };

  return transformedConversation;
}

export async function getConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId,
      deleted: null,
    },
    select: {
      id: true,
      subject: true,
      settings: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return conversations;
}

export async function saveMessages({
  conversationId,
  userMessage,
  assistantMessage,
  usage,
}: {
  conversationId: string;
  userMessage: string;
  assistantMessage: string;
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
        content: userMessage,
        role: 'user',
        tokens: usage.promptTokens,
      },
      {
        conversationId,
        content: assistantMessage,
        role: 'assistant',
        tokens: usage.completionTokens,
      },
    ],
  });

  return conversationId;
}

export async function deleteMessage(
  messageId: number,
  conversationId: string | undefined,
) {
  if (conversationId) {
    deleteConversation(conversationId);
  } else {
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        deleted: new Date().toISOString(),
      },
    });
  }
}
