import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.mjs';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Running express server on PORT ${PORT}`));
