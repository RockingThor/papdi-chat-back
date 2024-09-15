import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const v1GroupChatRouter = express.Router();
v1GroupChatRouter.use(authMiddleware);

v1GroupChatRouter.get("/all");
v1GroupChatRouter.post("/create");
v1GroupChatRouter.delete("/delete");
v1GroupChatRouter.put("/rename");
v1GroupChatRouter.put("/add-member");
v1GroupChatRouter.put("/remove-member");

export default v1GroupChatRouter;
