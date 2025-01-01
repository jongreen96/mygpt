import { PrismaClient } from '@prisma/client';

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
export async function createConversation(
  userId: string,
  conversationId: string,
) {
  await prisma.conversation.create({
    data: {
      id: conversationId,
      userId,
      subject: 'Test',
    },
    select: {
      id: true,
    },
  });
}

export async function getConversation(conversationId: string) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
  });

  return conversation;
}

export async function saveMessages({
  userId,
  conversationId,
  userMessage,
  assistantMessage,
  usage,
}: {
  userId: string;
  conversationId: string;
  userMessage: string;
  assistantMessage: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}) {
  const conversation = await getConversation(conversationId);
  if (!conversation) {
    await createConversation(userId, conversationId);
  }

  console.log(usage); // TODO: Record usage

  await prisma.message.createMany({
    data: [
      {
        conversationId,
        content: userMessage,
        role: 'user',
      },
      {
        conversationId,
        content: assistantMessage,
        role: 'assistant',
      },
    ],
  });

  return conversationId;
}

export async function getMessages(conversationId: string) {
  const messages = await prisma.message.findMany({
    select: {
      id: true,
      role: true,
      content: true,
    },
    where: {
      conversationId,
    },
  });

  // turn all messages id to string
  const formattedMessages = messages.map((message) => {
    return {
      id: message.id.toString(),
      content: message.content || '',
      role: message.role as 'user' | 'assistant',
    };
  });

  return formattedMessages;
}
