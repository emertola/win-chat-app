import express from 'express';
import employeeRoute from './routes/employee.route.mjs';

const app = express();
const PORT = 3001;


app.use(express.json());

app.use('/api/v1', employeeRoute);

app.listen(PORT, () => console.log(`Running express server on PORT ${PORT}`));




