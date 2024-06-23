import express from "express";
import bodyParser from "body-parser";
import { createUser } from "./controllers/userController";
import { createTask } from "./controllers/taskController";

const app = express();
app.use(bodyParser.json());

app.post("/users", createUser);

app.post("/users/:user_id/tasks", createTask);

export default app;
