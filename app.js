const nr = require('newrelic');
const Raven = require('raven');
const express = require ('express');
const path = require ('path');
const favicon = require ('serve-favicon');
const logger = require ('morgan');
const cookieParser = require ('cookie-parser');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const passportConf = require ('./passport');
const index = require ('./routes/index');
const users = require ('./routes/users');
const code = require ('./routes/code');
const codePair = require('./routes/code-pair');
const run = require ('./routes/run');
const submissions = require('./controllers/submissions');

const U = require ('./util/util');
const secrets = require('./config/config.json')[process.env.NODE_ENV || 'development'];

const app = express ();
Raven.config(secrets.sentryDSN).install()

// Sentry setup
app.use(Raven.requestHandler());

// view engine setup
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use (favicon (path.join (__dirname, 'public', 'favicon.ico')));
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: false }));
app.use (cookieParser ());

app.get ('*', U.setCorsHeaders)
app.post ('*', U.setCorsHeaders)
app.patch ('*', U.setCorsHeaders)
app.options ('*', U.setCorsHeaders)


passport.initialize()
app.use (express.static (path.join (__dirname, 'public')));
app.use (express.static (path.join (__dirname, '.well-known')));

app.post("/run/cb", submissions.done);

app.use(U.checkRequestOrigin)
app.use ('/', index);
app.use ('/run', run);
app.use ('/users', users);
app.use ('/code', code);
app.use('/code_pair', codePair)

app.use ('/.well-known', express.static (path.join (__dirname, '.well-known')));

// catch 404 and forward to error handler
app.use (function (req, res, next) {
  const err = new Error ('Not Found');
  err.status = 404;
  next (err);
});

// error handler
app.use(Raven.errorHandler());
app.use (function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get ('env') === 'development' ? err : {};

  // render the error page
  res.status (err.status || 500);
  res.render ('error');
});

module.exports = app;
