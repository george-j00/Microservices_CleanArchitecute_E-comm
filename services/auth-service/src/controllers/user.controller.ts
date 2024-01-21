import { UserUsecase } from "../usecases/UserUsecase";
import { Request, Response } from "express";

export class UserController {
  private readonly userUsecase: UserUsecase;
  constructor(employeeUsecase: UserUsecase) {
    this.userUsecase = employeeUsecase;
  }

  register_user = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const registeredUserData = await this.userUsecase.register(userData);
      res.status(200).json(registeredUserData);
    } catch (error) {
      res.status(500).send("Error while adding User");
      console.log("Error while adding => ", error);
    }
  };

  login_user = async (req: Request, res: Response) => {
    try {
      const {email ,password} = req.body;
      const loginResponse = await this.userUsecase.login(email, password);

    if (loginResponse !== null) {
      res.status(200).json({ token: loginResponse });
    } else {
      res.status(401).json({ error: "Login failed" });
      console.log("Login failed for user:", email);
    }

    } catch (error) {
      res.status(500).send("Error while adding User");
      console.log("Error while adding => ", error);
    }
  };


}
