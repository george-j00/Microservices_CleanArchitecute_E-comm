import amqp from "amqplib";
import { IUserSchema } from "../interfaces/IUserShema";
import { UserUsecase } from "../usecases/userUsecase";

export class AuthConsumers {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor(public userUsecase: UserUsecase){}

  async initialize() {
    try {
      const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
      this.connection = await amqp.connect(rabbitmqUrl);
      this.channel = await this.connection.createChannel();
      console.log('rabbitmq connection established');
      
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      process.exit(1); // Or handle the error appropriately
    }
  }
  //register consumer with registerQueue
   async consumeMessages() {
    if (!this.channel) {
      await this.initialize();
    }
    if (this.channel) {
      const queue = "registerQueue";
      await this.channel.assertQueue(queue, { durable: true });
       
      await this.channel.consume(
        queue,
        (msg) => {
          if (msg !== null && msg.content) {  
            try {
              console.log('row message ',msg);
              
              const data = JSON.parse(msg.content.toString());
              console.log("Received message:", data);
              this.userUsecase.register(data);
            } catch (error) {
              console.error("Error parsing message content:", error);
              console.log("Raw message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }


   async loginConsumer() {
    if (!this.channel) {
      await this.initialize();
    }
    if (this.channel) {
      const queue = "loginQueue";
      await this.channel.assertQueue(queue, { durable: true });
       
      await this.channel.consume(
        queue,
        (msg) => {
          if (msg !== null && msg.content) {  
            try {
              const data = JSON.parse(msg.content.toString());
              console.log("Received login credential:", data);
              const {email, password} = data;
              this.userUsecase.login(email, password);
            } catch (error) {
              console.error("Error parsing message content:", error);
              console.log("Raw message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }


}
