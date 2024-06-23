import { Response } from "express";
import * as T from "@effect-ts/core/Effect";

export const runEffect = <E, A>(
  effect: T.Effect<unknown, E, A>,
  res: Response,
  operation: string
): void => {
  T.run(effect, (exit) => {
    if (exit._tag === "Failure") {
      res
        .status(500)
        .json({ error: `Failed to ${operation}: ${exit.cause._tag}` });
    } else {
      res.status(200).json({ message: `${operation}`, result: exit.value });
    }
  });
};
