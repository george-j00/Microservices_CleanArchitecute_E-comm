import { Router, Request, Response } from "express";
import { UserUsecase } from "../usecases/UserUsecase";
import { UserController } from "../controllers/user.controller";
import { RabbitMQService } from "../infrastructure/message-broker/rabbitmq";
import { JwtService } from "../services/jwt";

export class AuthRouter {
  router = Router();
  secret_key = "secret_key";
  constructor() {
    const rabbitMQ = new RabbitMQService()
    const jwt = new JwtService(this.secret_key)

    const userUsecase = new UserUsecase(rabbitMQ , jwt);
    const controller = new UserController(userUsecase);

    this.router.post("/api/auth/register", (req: Request, res: Response) => {
      controller.register_user(req, res);
      // console.log('got call on the auth service');
    });
    this.router.post("/api/auth/login", (req: Request, res: Response) => {
      controller.login_user(req, res);
    });
  }
}

export const userRouter = new AuthRouter().router;
