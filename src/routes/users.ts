import { Router } from 'express';
import {
  createUser,
  getUser,
  getUsers,
  patchUserAvatar,
  patchUserProfile
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', patchUserProfile);
usersRouter.patch('/me/avatar', patchUserAvatar);

export default usersRouter;
