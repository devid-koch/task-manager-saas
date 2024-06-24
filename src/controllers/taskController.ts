import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  addTaskToUser,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../services/database";
import { Task } from "../models";
import { runEffect, runEffectWithMessage } from "../utils/effectUtils";
import * as T from "@effect-ts/core/Effect";
import { pipe } from "@effect-ts/core/Function";
import { validateRequiredFields } from "../utils/validation";

export const createTask = (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { title, description, status, dueDate } = req.body;

  if (!user_id) {
    return res.status(400).json({
      error: "Please provide user id",
    });
  }

  const requiredFields = ["title", "description", "status", "dueDate"];
  const validation = validateRequiredFields(requiredFields, req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
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
  runEffectWithMessage(effect, res, "Task created successfully");
};

export const listTasks = (req: Request, res: Response) => {
  const { user_id } = req.params;

  const requiredFields = ["user_id"];
  const validation = validateRequiredFields(requiredFields, req.params);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const effect = getTasks(user_id);
  runEffect(effect, res, "Task Lists");
};

export const getTaskById = (req: Request, res: Response) => {
  const { user_id, task_id } = req.params;

  const requiredFields = ["user_id", "task_id"];
  const validation = validateRequiredFields(requiredFields, req.params);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  const effect = getTask(user_id, task_id);
  runEffect(effect, res, "Task By Id");
};

export const updateTaskById = (req: Request, res: Response) => {
  const { user_id, task_id } = req.params;

  const requiredFields = ["user_id", "task_id"];
  const validation = validateRequiredFields(requiredFields, req.params);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  const effect = updateTask(user_id, task_id, req.body);
  runEffect(effect, res, "Task updated successfully");
};

export const deleteTaskById = (req: Request, res: Response) => {
  const { user_id, task_id } = req.params;

  const requiredFields = ["user_id", "task_id"];
  const validation = validateRequiredFields(requiredFields, req.params);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  const effect = deleteTask(user_id, task_id);
  runEffectWithMessage(effect, res, "Task Deleted successfully");
};
