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
exports.UserRepository = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new this.UserModel(user);
                yield newUser.save();
            }
            catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.findOne({ email: email }).exec();
                if (user) {
                    const token = this.generateToken(user);
                    return token;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Login failed:", error);
                throw new Error("Login failed");
            }
        });
    }
    generateToken(user) {
        const payload = {
            userId: user.id,
            username: user.name,
            email: user.email,
        };
        const secretKey = "your-secret-key";
        const expiresIn = "1h";
        return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
    }
}
exports.UserRepository = UserRepository;
