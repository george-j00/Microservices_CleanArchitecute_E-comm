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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUsecase = void 0;
class UserUsecase {
    constructor(rabbitmqService, jwtService) {
        this.rabbitmqService = rabbitmqService;
        this.jwtService = jwtService;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validateUser(user)) {
                console.log("User validation passed");
                yield this.rabbitmqService.publishUserRegisteredEvent(user);
                console.log("User registration event published successfully.");
            }
            else {
                throw new Error("User validation failed");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = {
                email: email,
                password: password,
            };
            const loginResponse = yield this.rabbitmqService.publicLoginCredentials(credentials);
            console.log('validationResponse in auth usecase', loginResponse);
            if (loginResponse !== null) {
                const token = this.jwtService.generateToken(email);
                console.log("token generated", token);
                return token;
            }
            return null;
        });
    }
    validateUser(user) {
        const isNameValid = user.name.trim() !== "" && /^[a-zA-Z0-9 ]+$/.test(user.name);
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
        const isPasswordValid = user.password.length >= 3;
        return isNameValid && isEmailValid && isPasswordValid;
    }
}
exports.UserUsecase = UserUsecase;
