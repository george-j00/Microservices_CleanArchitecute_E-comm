import { credentials } from "amqplib";
import { UserEntity } from "../entities/user.entity";
import { RabbitMQService } from "../infrastructure/message-broker/rabbitmq";
import { IUserCase } from "../interfaces/iUserUsecase";
import { JwtService } from "../services/jwt";

export class UserUsecase implements IUserCase {
  constructor(
    private rabbitmqService: RabbitMQService,
    private jwtService: JwtService
  ) {}

  async register(user: UserEntity): Promise<void> {
    if (this.validateUser(user)) {
      console.log("User validation passed");
      await this.rabbitmqService.publishUserRegisteredEvent(user);
      console.log("User registration event published successfully.");
    } else {
      throw new Error("User validation failed");
    }
  }

  async login(email: string, password: string): Promise<string | null> {
    const credentials = {
      email: email,
      password: password,
    };

    const  loginResponse  =
      await this.rabbitmqService.publicLoginCredentials(credentials);

    console.log('validationResponse in auth usecase', loginResponse);
    if (loginResponse !== null ) {
      const token = this.jwtService.generateToken(email);
      console.log("token generated", token);
      return token;
    }
    return null;
  }

  validateUser(user: UserEntity): boolean {
    const isNameValid =
      user.name.trim() !== "" && /^[a-zA-Z0-9 ]+$/.test(user.name);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
    const isPasswordValid = user.password.length >= 3;

    return isNameValid && isEmailValid && isPasswordValid;
  }

}
  