import { Effect } from "@effect-ts/core/Effect";
import { pipe } from "@effect-ts/core/Function";
import * as T from "@effect-ts/core/Effect";
import { Response } from "express";

export const runEffect = <A>(
  effect: Effect<unknown, Error, A>,
  res: Response
): void => {
  pipe(effect, T.runPromise).then(
    (result) => {
      res.json(result);
    },
    (error) => {
      res.status(500).send({ error: error.message });
    }
  );
};
