const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "Text-analayzer" });
const producer = kafka.producer();

async function consume() {
  await consumer.connect();
  await consumer.subscribe({ topic: "grabbed-text", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}

async function produce(text, userName) {
  await producer.connect();
  await producer.send({
    topic: "grabbed-text",
    messages: [{ value: userName + " *:* " + text }],
  });
  console.log("sent:", [{ value: userName + " *:* " + text }]);
  await producer.disconnect();
}

module.exports = {
  consume,
  produce,
};
