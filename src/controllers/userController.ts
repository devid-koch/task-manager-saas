import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { addUser } from "../services/database";
import { User } from "../models";
import { runEffect } from "../utils/effectUtils";
import * as T from "@effect-ts/core/Effect";
import { pipe } from "@effect-ts/core/Function";

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res
      .status(400)
      .json({ error: "Name and email are required fields." });
  } else if (!name) {
    return res.status(400).json({ error: "Name is a required field." });
  } else if (!email) {
    return res.status(400).json({ error: "Email is a required field." });
  }

  const effect = pipe(
    T.succeedWith(() => {
      const userId = uuidv4();
      const user: User = { id: userId, name, email, tasks: new Map() };
      return user;
    }),
    T.chain(addUser)
  );
  runEffect(effect, res);
};
