import amqp from "amqplib";

export class RabbitMQService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async initialize() {
    const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://rabbitmq";
    this.connection = await amqp.connect(rabbitmqUrl);
    this.channel = await this.connection.createChannel();
  }

  async publishUserRegisteredEvent(userData: any) {
    if (!this.channel) {
      await this.initialize();
    }
    if (this.channel) {
      const queue = 'registerQueue';
      await this.channel.assertQueue(queue, { durable: true });

      this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(userData))
      );

      console.log(`The user data is sent successfully`);
    } else {
      console.error("Failed to create a channel");
    }
  }

  public async publichLoginCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const queue = "loginQueue";
    const correlationId = "12345"; // You may generate a unique ID for each request

    if (this.channel) {
      await this.channel.assertQueue(queue, { durable: true });
    }

    return new Promise((resolve ,reject) => {
      if (this.channel) {
        this.channel.sendToQueue(
          queue,
          Buffer.from(JSON.stringify(credentials)),
          { correlationId }
        );

        // Assuming that the consumer will send back a response with the same correlationId
        this.channel.consume(
          queue, 
          (msg) => {
            if (msg) {
              if (msg.properties.correlationId === correlationId) {
                const isValid = JSON.parse(msg.content.toString());
                if (isValid) {
                  resolve(isValid);
                }else{
                  reject('Login failed : invalid credentials')
                }
              }
            }
          },
          { noAck: true }
        );
      }
    });
  }

}
