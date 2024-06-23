import express from "express";
import bodyParser from "body-parser";
import { createUser } from "./controllers/userController";
import {
  createTask,
  getTaskById,
  listTasks,
  updateTaskById,
} from "./controllers/taskController";

const app = express();
app.use(bodyParser.json());

app.post("/users", createUser);

app.post("/users/:user_id/tasks", createTask);

app.get("/users/:user_id/tasks", listTasks);
app.get("/users/:user_id/tasks/:task_id", getTaskById);
app.put("/users/:user_id/tasks/:task_id", updateTaskById);

export default app;
