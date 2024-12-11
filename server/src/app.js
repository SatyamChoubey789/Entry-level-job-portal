const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const process = require('process');

// app
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // enable setting of cookies
  }),
);
app.use(helmet());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: 1024 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes importation
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');


// routes declaration
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users', authRoutes);

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
});

module.exports = app;
