import express from "express";
import "dotenv/config";
import v1UserRouter from "./routes/v1/userRouter.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cors from "cors";
import v1ChatRouter from "./routes/v1/chatRouter.js";
import v1GroupChatRouter from "./routes/v1/groupChatRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/chat", v1ChatRouter);
app.use("/api/v1/group", v1GroupChatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
