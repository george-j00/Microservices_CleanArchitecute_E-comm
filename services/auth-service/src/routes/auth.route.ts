import { Router, Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import  UserModel  from "../adapters/models/userSchema";
import { UserUsecase } from "../usecases/UserUsecase";
import { UserController } from "../controllers/user.controller";

export class AuthRouter {
  router = Router();

  constructor() {
    const userRepository = new UserRepository(UserModel);
    const userUsecase = new UserUsecase(userRepository);
    const controller = new UserController(userUsecase);

    this.router.post("/api/register", (req: Request, res: Response) => {
      controller.register_user(req, res);
    });
    this.router.post("/api/login", (req: Request, res: Response) => {
      controller.login_user(req, res);
    });
  }
}

export const userRouter = new AuthRouter().router;
