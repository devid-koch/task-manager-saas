import { User, Task } from "../models";
import * as T from "@effect-ts/core/Effect";
import * as O from "@effect-ts/core/Option";
import { pipe } from "@effect-ts/core/Function";

const users = new Map<string, User>();

export const getUser = (userId: string) =>
  T.succeedWith(() => O.fromNullable(users.get(userId)));

export const addUser = (user: User) =>
  T.succeedWith(() => {
    users.set(user.id, user);
    return user;
  });

export const addTaskToUser = (userId: string, task: Task) =>
  pipe(
    getUser(userId),
    T.chain(
      O.fold(
        () => T.fail(new Error("User not found")),
        (user) =>
          T.succeedWith(() => {
            const updatedUser = {
              ...user,
              tasks: new Map(user.tasks).set(task.id, task),
            };
            users.set(user.id, updatedUser);
            return updatedUser;
          })
      )
    )
  );

export const getTasks = (userId: string) =>
  pipe(
    getUser(userId),
    T.map(O.map((user) => Array.from(user.tasks.values())))
  );

export const getTask = (userId: string, taskId: string) =>
  pipe(
    getUser(userId),
    T.map(O.chain((user) => O.fromNullable(user.tasks.get(taskId))))
  );

export const updateTask = (
  userId: string,
  taskId: string,
  updatedTask: Partial<Task>
) =>
  pipe(
    getUser(userId),
    T.chain(
      O.fold(
        () => T.fail(new Error("User not found")),
        (user) =>
          T.succeedWith(() => {
            const task = user.tasks.get(taskId);
            if (!task) throw new Error("Task not found");
            const newTask = { ...task, ...updatedTask };
            const updatedUser = {
              ...user,
              tasks: new Map(user.tasks).set(taskId, newTask),
            };
            users.set(user.id, updatedUser);
            return newTask;
          })
      )
    )
  );
