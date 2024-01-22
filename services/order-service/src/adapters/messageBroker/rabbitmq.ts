// import amqp from "amqplib";

// export class RabbitMQService {
//   private connection: amqp.Connection | null = null;
//   private channel: amqp.Channel | null = null;

//   async initialize() {
//     // const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://rabbitmq";
//     const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
//     this.connection = await amqp.connect(rabbitmqUrl);
//     this.channel = await this.connection.createChannel();
//   }


//   public async publishEvent(productId : string, userId : string): Promise<any> {
//     const queue1 = "queue1";
//     const queue2 = "queue2";
//     const queue3 = "queue3";
//     const queue4 = "queue4";

//     const correlationId1 = "123";
//     const correlationId2 = "456";

//     if (!this.channel) {
//       await this.initialize(); 
//     }

//     if (this.channel) {
//       await this.channel.assertQueue(queue1, { durable: true });
//       await this.channel.assertQueue(queue2, { durable: true });
//     }

//     return new Promise((resolve, reject) => {
//       if (this.channel) {
//         this.channel.sendToQueue(
//           queue1,
//           Buffer.from(JSON.stringify(credentials)),
//           { correlationId }
//         );

//         console.log("Login data sent to user service");

//         this.channel.consume(
//           queue2,
//           (msg) => {
//             if (msg && msg.properties.correlationId === correlationId) {
//               const loginResponse = JSON.parse(msg.content.toString());
//               resolve(loginResponse);
//               console.log("Response from the user service", loginResponse);
//               this.channel?.ack(msg);
//             }
//           },
//           { noAck: false }
//         );
//       }
//     });
//   }

// }
    