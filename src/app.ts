import express from 'express';
import bodyParser from 'body-parser';
import { createUser } from './controllers/userController';

const app = express();
app.use(bodyParser.json());

app.post('/users', createUser);

export default app;
