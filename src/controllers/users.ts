import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import { ICustomRequest } from '../utils/types';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFoundError } from '../errors/NotFoundError';
import { ErrorPatternMessages, HttpResponseStatusCodes } from '../utils/enums';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});

    return res.status(HttpResponseStatusCodes.OK).send(users);
  } catch (err) {
    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} пользователя!`));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_DELETE} пользователя (id)!`));
    }
    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const createdUser = await User.create({ name, about, avatar });

    return res.status(HttpResponseStatusCodes.CREATED).send(createdUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_CREATE} пользователя!`));
    }
    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const patchUserProfile = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const id = req.user?._id;
    const patchedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(patchedUser);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} пользователя!`));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_UPDATE} профиля пользователя!`));
    }
    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const patchUserAvatar = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    const id = req.user?._id;
    const patchedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(patchedUser);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} пользователя!`));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_UPDATE} аватара пользователя!`));
    }
    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};
