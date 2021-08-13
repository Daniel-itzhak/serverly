var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api');
const Routes = require('./routes/routes');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const db = require('./config/mongo.config')
var app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
  res.setHeader("Content-Range", "*");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Routes);
app.use('/api', apiRoutes)







module.exports = app;
