import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import routes from './routes';
import dotenv from 'dotenv';
import './strategies/local-strategy';
import mongoConnect from './db/mongodb-connect.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: 'session123', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);

app.listen(PORT, () => {
  mongoConnect();
  console.log(`Running express server on PORT ${PORT}`);
});
