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
exports.RabbitMQService = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQService {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
            this.connection = yield amqplib_1.default.connect(rabbitmqUrl);
            this.channel = yield this.connection.createChannel();
        });
    }
    publishUserRegisteredEvent(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                yield this.initialize();
            }
            if (this.channel) {
                const queue = 'registerQueue';
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));
                console.log(`The user data is sent successfully`);
            }
            else {
                console.error("Failed to create a channel");
            }
        });
    }
    publichLoginCredentials(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = "loginQueue";
            const correlationId = "12345"; // You may generate a unique ID for each request
            if (this.channel) {
                yield this.channel.assertQueue(queue, { durable: true });
            }
            return new Promise((resolve) => {
                if (this.channel) {
                    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(credentials)), { correlationId });
                    // Assuming that the consumer will send back a response with the same correlationId
                    this.channel.consume(queue, (msg) => {
                        if (msg) {
                            if (msg.properties.correlationId === correlationId) {
                                const isValid = JSON.parse(msg.content.toString());
                                resolve(isValid);
                            }
                        }
                    }, { noAck: true });
                }
            });
        });
    }
}
exports.RabbitMQService = RabbitMQService;
