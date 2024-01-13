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
exports.UserController = void 0;
class UserController {
    constructor(employeeUsecase) {
        this.register_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const registeredUserData = yield this.userUsecase.register(userData);
                res.status(200).json(registeredUserData);
            }
            catch (error) {
                res.status(500).send("Error while adding User");
                console.log("Error while adding => ", error);
            }
        });
        this.login_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userUsecase.login(email, password);
                res.status(200).json(token);
            }
            catch (error) {
                res.status(500).send("Error while adding User");
                console.log("Error while adding => ", error);
            }
        });
        this.userUsecase = employeeUsecase;
    }
}
exports.UserController = UserController;
