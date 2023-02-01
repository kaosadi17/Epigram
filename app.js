var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var epigramsRouter = require('./routes/epigrams');
var port = '5000';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/epigrams', epigramsRouter);

app
  .listen(port, () => {
    console.info(`Server is running in port ${port}`);
  })
  .on("error", (error) => {
    console.info(error.message);
  });

module.exports = app;
