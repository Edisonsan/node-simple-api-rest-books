const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter
  .route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    console.log(book);
    return res.json(book);
  })
  .get((req, res) => {
    // const { query } = req; //Exact condition query.
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        res.send(err);
      }

      res.json(books);
    });
  });

bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      res.send(err);
    }

    res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, rest) => {
  rest.send('Welcome to my NodeMon API!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
