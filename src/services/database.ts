
import { User } from '../models';
import * as T from '@effect-ts/core/Effect';
import * as O from '@effect-ts/core/Option';

const users = new Map<string, User>();

export const getUser = (userId: string) => 
  T.succeedWith(() => O.fromNullable(users.get(userId)));

export const addUser = (user: User) =>
  T.succeedWith(() => {
    users.set(user.id, user);
    return user;
  });
