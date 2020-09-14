/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
let moncash = require('nodejs-moncash-sdk');

// Sandbox Bolet Ideal
// Client Id: dd0932fe75bc2febbe847048934f96ee
// Client Secret: 8AuRKzyOhwSYiiJYy8G3qkxAfJM3Lh3iZzUKMcxbVhAREPbrfDgOnPubzNQ6IeJw

// Documentation Credentials
// client_id: 'c1bf0a27d6bbb217a599c9e25480c11d',
// client_secret:
//   'oHrr4tbnB1PH0uz6VQNUvVVDNVNvk0WiIXZWBAed4-CBCwilT8yUdS87AZoPrtqN',

moncash.configure({
  mode: 'sandbox', // sandbox or live
  client_id: 'dd0932fe75bc2febbe847048934f96ee',
  client_secret:
    '8AuRKzyOhwSYiiJYy8G3qkxAfJM3Lh3iZzUKMcxbVhAREPbrfDgOnPubzNQ6IeJw',
});

// // Get Payment by Order_id
// moncash.capture.getByOrderId('1555952605', (error, capture) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(capture);
//   }
// });

exports.makePayment = async (amount, orderId) => {
  const paymentCreator = moncash.payment;

  const createPaymentJSON = {
    amount,
    orderId,
  };
  console.log('Create a payment');

  await paymentCreator.create(createPaymentJSON, async (error, payment) => {
    if (error) {
      console.log(error);
      return error;
    }

    console.log(payment);

    const _url = await paymentCreator.redirect_uri(payment);

    console.log(_url);

    return _url;
  });
};

exports.getByTransactionId = moncash.capture.getByTransactionId;
exports.getByOrderId = moncash.capture.getByOrderId;
