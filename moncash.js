/* eslint-disable no-console */
let moncash = require('nodejs-moncash-sdk');

const createPaymentJSON = {
  amount: 50,
  orderId: '123445564454542123',
};

moncash.configure({
  mode: 'sandbox', // sandbox or live
  client_id: 'c1bf0a27d6bbb217a599c9e25480c11d',
  client_secret:
    'oHrr4tbnB1PH0uz6VQNUvVVDNVNvk0WiIXZWBAed4-CBCwilT8yUdS87AZoPrtqN',
});

const paymentCreator = moncash.payment;

paymentCreator.create(createPaymentJSON, (error, payment) => {
  if (error) {
    console.log(error);
    return error;
  }

  return paymentCreator.redirect_uri(payment);
});

// Get payment by Transaction_id
moncash.capture.getByTransactionId('1555945998145', (error, capture) => {
  if (error) {
    console.error(error);
  }
  console.log(capture);
});
// Get Payment by Order_id
moncash.capture.getByOrderId('1555952605', (error, capture) => {
  if (error) {
    console.error(error);
  } else {
    console.log(capture);
  }
});

exports.getPayment = paymentCreator;
exports.getByTransactionId = moncash.capture.getByTransactionId;
exports.getByOrderId = moncash.capture.getByOrderId;
