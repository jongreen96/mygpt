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

export async function getConversation(conversationId: string) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
  });

  return conversation;
}

export async function deleteConversation(conversationId: string) {
  await prisma.conversation.delete({
    where: {
      id: conversationId,
    },
  });
}

export async function getConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      subject: true,
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

export async function getMessages(
  conversationId: string,
  userId: string | undefined,
) {
  const result = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
      userId: userId,
    },
    include: {
      Message: {
        select: {
          id: true,
          content: true,
          role: true,
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
  await prisma.message.delete({
    where: {
      id: messageId,
    },
  });
}
