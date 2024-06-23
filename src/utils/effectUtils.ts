import { Effect } from '@effect-ts/core/Effect';
import { pipe } from '@effect-ts/core/Function';
import * as T from '@effect-ts/core/Effect';
import { Response } from 'express';

// Define a function runEffect that takes an Effect and a Response object
export const runEffect = <A>(effect: Effect<unknown, Error, A>, res: Response): void => {
  pipe(
    effect,
    T.runPromise // Run the Effect and convert to Promise
  ).then(
    result => {
      res.json(result); // Send result as JSON response
    },
    error => {
      res.status(500).send({ error: error.message }); // Handle errors with a 500 status and error message
    }
  );
};
