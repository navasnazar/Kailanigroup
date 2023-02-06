const express = require('express')
const logger = require('morgan');
const session=require('express-session')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: "config.env" })
const path1 = require('path');

const port = process.env.PORT
const path = port

var db=require('./config/database')

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

const app = express()

app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use(session({
    secret:'Key',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:6000000}
  }))

app.use('/admin', adminRouter);
app.use('/', usersRouter);

// for sever
app.use(express.static(path1.join(__dirname, '/client/build/')));
// for sever

app.get('*', (req, res) => {
  res.sendFile(path1.join(__dirname, '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
