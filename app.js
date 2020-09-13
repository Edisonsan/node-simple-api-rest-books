const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const transactionRouter = express.Router();
const port = process.env.PORT || 3000;
const Transaction = require('./models/transactionModel');
const MonCash = require('./moncash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

transactionRouter
  .route('/transactions')
  .post((req, res) => {
    const transaction = new Transaction(req.body);

    MonCash.getPayment();

    return res.json(transaction);
  })
  .get((req, res) => {
    // const { query } = req; //Exact condition query.
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Transaction.find(query, (err, books) => {
      if (err) {
        res.send(err);
      }

      res.json(books);
    });
  });

transactionRouter.route('/transactions/:transactionId').get((req, res) => {
  Transaction.findById(req.params.bookId, (err, transaction) => {
    if (err) {
      res.send(err);
    }

    res.json(transaction);
  });
});

app.use('/api', transactionRouter);

app.get('/', (req, rest) => {
  rest.send('Welcome to my NodeMon API!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
