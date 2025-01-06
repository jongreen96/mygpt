import { PrismaClient } from '@prisma/client';
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
}: {
  userId: string;
  messages: { role: string; content: string }[];
}) {
  const subject = await generateSubject(messages);

  const newConversation = await prisma.conversation.create({
    data: {
      userId,
      subject: subject,
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

export async function getConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId,
      deleted: null,
    },
    select: {
      id: true,
      subject: true,
    },
    orderBy: {
      createdAt: 'asc',
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

export async function getMessages(
  conversationId: string,
  userId: string | undefined,
) {
  const result = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
      userId: userId,
      deleted: null,
    },
    include: {
      Message: {
        select: {
          id: true,
          content: true,
          role: true,
        },
        where: {
          deleted: null,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  const messages = result?.Message;

  // turn all messages id to string
  const formattedMessages = messages?.map((message) => {
    return {
      id: message.id.toString(),
      content: message.content || '',
      role: message.role as 'user' | 'assistant',
    };
  });

  return formattedMessages;
}

export async function deleteMessage(messageId: number) {
  await prisma.message.update({
    where: {
      id: messageId,
    },
    data: {
      deleted: new Date().toISOString(),
    },
  });
}
