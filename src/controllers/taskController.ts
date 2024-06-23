import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  addTaskToUser,
  getTask,
  getTasks,
  updateTask,
} from "../services/database";
import { Task } from "../models";
import { runEffect } from "../utils/effectUtils";
import * as T from "@effect-ts/core/Effect";
import { pipe } from "@effect-ts/core/Function";

export const createTask = (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { title, description, status, dueDate } = req.body;

  if (!title && !description && !status && !dueDate) {
    return res.status(400).json({
      error: "Title, description, status and due date are required fields.",
    });
  }
  const effect = pipe(
    T.succeedWith(() => {
      const task: Task = {
        id: uuidv4(),
        title: title,
        description: description,
        status: status,
        dueDate: new Date(dueDate),
      };
      return task;
    }),
    T.chain((task) => addTaskToUser(user_id, task))
  );
  runEffect(effect, res, "Task created successfully");
};

export const listTasks = (req: Request, res: Response) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({
      error: "Please provide user id",
    });
  }

  const effect = getTasks(user_id);
  runEffect(effect, res, "Task Lists");
};

export const getTaskById = (req: Request, res: Response) => {
  const { user_id, task_id } = req.params;

  if (!user_id && !task_id) {
    return res.status(400).json({
      error: "Please provide user id and task id",
    });
  }
  const effect = getTask(user_id, task_id);
  runEffect(effect, res, "Task By Id");
};

export const updateTaskById = (req: Request, res: Response) => {
  const { user_id, task_id } = req.params;

  if (!user_id && !task_id) {
    return res.status(400).json({
      error: "Please provide user id and task id",
    });
  }
  const effect = updateTask(user_id, task_id, req.body);
  runEffect(effect, res, "Task updated successfully");
};
