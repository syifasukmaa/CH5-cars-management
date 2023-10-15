require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const router = require('./routes');
const ApiError = require('./utils/apiError');
const errorHandler = require('./controller/errorController');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(router);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: 'Route does not exist',
  // });
  // const err = new Error('Routes does not exist');
  // err.status = 'Failed';
  // err.statusCode = 404;
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server jalan di port ${PORT}`);
});
