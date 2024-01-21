import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loginUser, start } from "simple-auth-connection";
import { AuthConsumers } from "./infrastructure/rabbitmq";
import { UserUsecase } from "./usecases/userUsecase";
import { UserRepository } from "./repository/userRepository";
import { UserModel } from "./infrastructure/models/user.schema";


const userRepository = new UserRepository(UserModel);
const userUsecase = new UserUsecase(userRepository);
const consumerMessage = new AuthConsumers(userUsecase);




dotenv.config();
const app: Express = express();
const port = process.env.PORT;

start(process.env.MONGODB_URI!);

const rabbitMQ = async () => {
  await consumerMessage.consumeMessages()
  await consumerMessage.loginCommunications()
};

rabbitMQ();

app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
