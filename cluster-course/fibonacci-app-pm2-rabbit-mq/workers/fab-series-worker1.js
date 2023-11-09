const rq = require("amqplib/callback_api");

/**
 * Consumer
 */
rq.connect("amqp://localhost", (err, connection) => {
  if (err) {
    process.exit();
  } else {
    const queueName = "FabSeries1";
    connection.createChannel((err, channel) => {
      channel.assertQueue(queueName, { durable: false });
      // assert existence of queue
      // if durable set to true, it will be saved to disk -> persistent
      // durable false -> transient
      channel.consume(
        queueName,
        (message) => {
          console.log(`Waiting for messages`);
          console.log(`${queueName} - ${message.content.toString()}`);
        },
        { noAck: true }
      );
    });
  }
});
