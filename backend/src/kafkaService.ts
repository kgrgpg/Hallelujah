import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'lob-exchange-backend',
  brokers: ['localhost:9092'] // Adjust as per your Kafka setup
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'lob-exchange-group' });

export const initializeKafka = async () => {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()} on topic ${topic}`);
      // Additional logic to handle the message
    },
  });
};
