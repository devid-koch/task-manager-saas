import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { addUser } from "../services/database";
import { User } from "../models";
import { runEffect } from "../utils/effectUtils";
import * as T from "@effect-ts/core/Effect";
import { pipe } from "@effect-ts/core/Function";
import { validateRequiredFields } from "../utils/validation";

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  const requiredFields = ["name", "email"];
  const validation = validateRequiredFields(requiredFields, req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const effect = pipe(
    T.succeedWith(() => {
      const userId = uuidv4();
      const user: User = { id: userId, name, email, tasks: new Map() };
      return user;
    }),
    T.chain(addUser)
  );
  runEffect(effect, res, "User created successfully");
};
