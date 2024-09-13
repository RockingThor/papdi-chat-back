import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.groupMessage.deleteMany({});
  await prisma.groupChatUser.deleteMany({});
  await prisma.groupChat.deleteMany({});
  await prisma.oneToOneChat.deleteMany({});
  await prisma.user.deleteMany({});
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: "password1",
      name: "John Doe",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: "password2",
      name: "Jane Doe",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "user3@example.com",
      password: "password3",
      name: "Bob Smith",
    },
  });

  // Create One-to-One Chat between user1 and user2
  await prisma.oneToOneChat.create({
    data: {
      senderId: user1.id,
      receiverId: user2.id,
      message: "Hello, user2!",
    },
  });

  await prisma.oneToOneChat.create({
    data: {
      senderId: user2.id,
      receiverId: user1.id,
      message: "Hey user1, how are you?",
    },
  });

  // Create a Group Chat
  const groupChat = await prisma.groupChat.create({
    data: {
      name: "Project Group",
      users: {
        create: [
          { userId: user1.id },
          { userId: user2.id },
          { userId: user3.id },
        ],
      },
      ownerId: user1.id,
    },
  });

  // Create Messages in Group Chat
  await prisma.groupMessage.create({
    data: {
      groupId: groupChat.id,
      senderId: user1.id,
      message: "Hey team, are we ready for the meeting?",
    },
  });

  await prisma.groupMessage.create({
    data: {
      groupId: groupChat.id,
      senderId: user2.id,
      message: "Yes, I’m all set.",
    },
  });

  await prisma.groupMessage.create({
    data: {
      groupId: groupChat.id,
      senderId: user3.id,
      message: "Let’s do this!",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
