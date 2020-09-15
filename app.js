// import createError from 'http-errors';
// import express from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';

// import indexRouter from './routes/index';
// import usersRouter from './routes/users';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from "passport";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';


import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
module.exports = app;