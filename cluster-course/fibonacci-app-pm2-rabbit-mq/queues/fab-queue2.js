const fabObj = require("../math-logic/fibonacci-series");
const rq = require("amqplib/callback_api");

/**
 * Producer
 */
function sendValueInFabQueue2(num) {
  rq.connect("amqp://localhost", (err, connection) => {
    if (err) process.exit();
    const queueName = "FabSeries2";
    connection.createChannel((error, channel) => {
      if (error) {
        console.log(error);
        process.exit();
      } else {
        let fabNum = fabObj.calculateFibonacciValue(num);
        channel.assertQueue(queueName, { durable: false });
        // assert existence of queue
        // if durable set to true, it will be saved to disk -> persistent
        // durable false -> transient
        channel.sendToQueue(queueName, Buffer.from(fabNum.toString()));
        console.log(`Queue Name is ${queueName}`);
      }
    });
  });
}

module.exports = sendValueInFabQueue2;
