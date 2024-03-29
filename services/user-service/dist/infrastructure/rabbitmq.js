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
exports.AuthConsumers = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class AuthConsumers {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
        this.connection = null;
        this.channel = null;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
                const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
                this.connection = yield amqplib_1.default.connect(rabbitmqUrl);
                this.channel = yield this.connection.createChannel();
                console.log("rabbitmq connection established");
            }
            catch (error) {
                console.error("Error connecting to RabbitMQ:", error);
                process.exit(1); // Or handle the error appropriately
            }
        });
    }
    //register consumer with registerQueue
    consumeMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                yield this.initialize();
            }
            if (this.channel) {
                const queue = "registerQueue";
                yield this.channel.assertQueue(queue, { durable: true });
                yield this.channel.consume(queue, (msg) => {
                    if (msg !== null && msg.content) {
                        try {
                            console.log("row message ", msg);
                            const data = JSON.parse(msg.content.toString());
                            console.log("Received message:", data);
                            this.userUsecase.register(data);
                        }
                        catch (error) {
                            console.error("Error parsing message content:", error);
                            console.log("Raw message content:", msg.content.toString());
                        }
                    }
                }, { noAck: true });
            }
            else {
                console.error("Failed to create a channel");
            }
        });
    }
    loginCommunications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queue1 = "queue1";
                const queue2 = "queue2";
                if (!this.channel) {
                    yield this.initialize();
                }
                if (this.channel) {
                    yield this.channel.assertQueue(queue1, { durable: true });
                    yield this.channel.assertQueue(queue2, { durable: true });
                }
                if (this.channel) {
                    yield this.channel.consume(queue1, (msg) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            if (this.channel && msg) {
                                const data = JSON.parse(msg.content.toString());
                                const correlationId = msg.properties.correlationId;
                                console.log("Correlation ID:", correlationId);
                                console.log("Received login credential:", data);
                                this.channel.ack(msg);
                                const { email, password } = data;
                                const loginResponse = yield this.userUsecase.login(email, password);
                                this.channel.sendToQueue(queue2, Buffer.from(JSON.stringify(loginResponse)), { correlationId });
                                console.log("Response send back to auth service");
                            }
                        }
                        catch (error) {
                            console.error("Error processing message:", error);
                        }
                    }), { noAck: false });
                }
            }
            catch (error) {
                console.error("Error in login consumer:", error);
            }
        });
    }
}
exports.AuthConsumers = AuthConsumers;
