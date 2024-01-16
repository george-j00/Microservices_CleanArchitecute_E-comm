"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.AuthRouter = void 0;
const express_1 = require("express");
const UserUsecase_1 = require("../usecases/UserUsecase");
const user_controller_1 = require("../controllers/user.controller");
const rabbitmq_1 = require("../infrastructure/message-broker/rabbitmq");
const jwt_1 = require("../services/jwt");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.secret_key = "secret_key";
        const rabbitMQ = new rabbitmq_1.RabbitMQService();
        const jwt = new jwt_1.JwtService(this.secret_key);
        const userUsecase = new UserUsecase_1.UserUsecase(rabbitMQ, jwt);
        const controller = new user_controller_1.UserController(userUsecase);
        this.router.post("/api/auth/register", (req, res) => {
            controller.register_user(req, res);
        });
        this.router.post("/api/auth/login", (req, res) => {
            controller.login_user(req, res);
        });
    }
}
exports.AuthRouter = AuthRouter;
exports.userRouter = new AuthRouter().router;
