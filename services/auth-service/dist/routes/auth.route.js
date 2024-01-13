"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.AuthRouter = void 0;
const express_1 = require("express");
const userRepository_1 = require("../repositories/userRepository");
const userSchema_1 = __importDefault(require("../adapters/models/userSchema"));
const UserUsecase_1 = require("../usecases/UserUsecase");
const user_controller_1 = require("../controllers/user.controller");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const userRepository = new userRepository_1.UserRepository(userSchema_1.default);
        const userUsecase = new UserUsecase_1.UserUsecase(userRepository);
        const controller = new user_controller_1.UserController(userUsecase);
        this.router.post("/api/register", (req, res) => {
            controller.register_user(req, res);
        });
        this.router.post("/api/login", (req, res) => {
            controller.login_user(req, res);
        });
    }
}
exports.AuthRouter = AuthRouter;
exports.userRouter = new AuthRouter().router;
