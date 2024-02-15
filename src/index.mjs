import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import routes from './routes/index.mjs';
import './strategies/local-strategy.mjs';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'session123' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Running express server on PORT ${PORT}`));
