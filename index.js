import express from "express";
import "dotenv/config";
import v1UserRouter from "./routes/v1/userRouter.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", v1UserRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
