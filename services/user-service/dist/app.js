"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const simple_auth_connection_1 = require("simple-auth-connection");
const rabbitmq_1 = require("./infrastructure/rabbitmq");
const userUsecase_1 = require("./usecases/userUsecase");
const userRepository_1 = require("./repository/userRepository");
const user_schema_1 = require("./infrastructure/models/user.schema");
const userRepository = new userRepository_1.UserRepository(user_schema_1.UserModel);
const userUsecase = new userUsecase_1.UserUsecase(userRepository);
const consumerMessage = new rabbitmq_1.AuthConsumers(userUsecase);
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, simple_auth_connection_1.start)(process.env.MONGODB_URI);
const rabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumerMessage.consumeMessages();
    yield consumerMessage.loginCommunications();
});
rabbitMQ();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
