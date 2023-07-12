import { BadRequestError, InternalServerError, NotFoundError } from "../errors/errors"
import { Request } from "express"
import { ObjectId, Schema } from "mongoose"


export interface IUser {
  name: string,
  about: string,
  avatar: string
}

export interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: [Schema.Types.ObjectId],
  createdAt: Date
}

export interface ICustomRequest extends Request {
  user?: {
    _id: string | ObjectId;
  }
}

export type TError = BadRequestError | NotFoundError | InternalServerError;