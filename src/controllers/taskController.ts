import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { addTaskToUser } from "../services/database";
import { Task } from "../models";
import { runEffect } from "../utils/effectUtils";
import * as T from "@effect-ts/core/Effect";
import { pipe } from "@effect-ts/core/Function";

export const createTask = (req: Request, res: Response) => {
  const { user_id } = req.params;
  console.log(req.body.title);
  const effect = pipe(
    T.succeedWith(() => {
      const task: Task = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: new Date(req.body.dueDate),
      };
      return task;
    }),
    T.chain((task) => addTaskToUser(user_id, task))
  );
  runEffect(effect, res);
};
