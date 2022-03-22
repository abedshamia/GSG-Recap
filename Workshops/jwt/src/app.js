require('express-async-errors');
const express = require('express');
const {join} = require('path');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/userRoutes');
const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/v1', usersRouter);

app.use(errorHandler);

module.exports = app;
