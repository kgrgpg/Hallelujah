import { Kafka } from 'kafkajs';
import { Subject } from 'rxjs';

const kafka = new Kafka({
  clientId: 'lob-exchange-backend',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'lob-exchange-group' });

export const messageStream = new Subject<{ topic: string; partition: number; message: string }>();

export const initializeKafka = async () => {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Ensure message.value is not null before converting it to a string
      if (message.value) {
        messageStream.next({ topic, partition, message: message.value.toString() });
      } else {
        // Optionally handle or log the case where message.value is null
        console.error(`Received null message on topic ${topic}`);
      }
    },
  });
};

export { producer, consumer };
