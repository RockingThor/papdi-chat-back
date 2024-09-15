import { prisma } from "../db/prismaInitializer.js";

export async function getSearchResults(req, res) {
  try {
    const query = req.query.search;
    console.log(query);
    const id = req.user.id;
    console.log(id);

    if (!query) {
      return res.status(400).json({ message: "Please provide a search query" });
    }
    const results = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
        id: {
          not: id,
        },
      },
      select: {
        password: false,
        id: true,
        name: true,
      },
    });
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getChats(req, res) {
  try {
    const id = req.user.id;
    const chats = await prisma.oneToOneChat.findMany({
      where: {
        OR: [{ senderId: id }, { receiverId: id }],
      },
      orderBy: {
        sentAt: "desc",
      },
      select: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
        sentAt: true,
        message: true,
      },
    });

    const uniqueChats = [];
    const partnerIds = new Set();
    chats.forEach((chat) => {
      const partner = chat.sender.id === userId ? chat.receiver : chat.sender;

      if (!partnerIds.has(partner.id)) {
        partnerIds.add(partner.id);
        uniqueChats.push(chat);
      }
    });

    return res.status(200).json(uniqueChats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getIndividualChats(req, res) {
  try {
    const userId = req.user.id;
    const partnerId = req.params.chatPartner;
    const chatMessages = await prisma.oneToOneChat.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: partnerId,
          },
          {
            receiverId: userId,
            senderId: partnerId,
          },
        ],
      },
      orderBy: {
        sentAt: "asc",
      },
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
        message: true,
        sentAt: true,
      },
    });
    return res.status(200).json(chatMessages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function createChat(req, res) {}
