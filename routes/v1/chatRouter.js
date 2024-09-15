import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  getChats,
  getSearchResults,
} from "../../controllers/chatController.js";

const v1ChatRouter = express.Router();
v1ChatRouter.use(authMiddleware);

v1ChatRouter.get("/", getSearchResults);
v1ChatRouter.get("/chats", getChats);

export default v1ChatRouter;
