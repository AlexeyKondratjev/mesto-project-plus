import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { ICustomRequest } from "../utils/types";
import mongoose, { ObjectId } from "mongoose";
import { ErrorPatternMessages, HttpResponseStatusCodes } from "../utils/enums";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/errors";



export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

    return res.status(HttpResponseStatusCodes.OK).send(cards);
  } catch (err) {
    next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const createCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const owner = req.user?._id;
    const createdCard = await Card.create({ name, link, owner });

    return res.status(HttpResponseStatusCodes.CREATED).send(createdCard);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_CREATE} карточки!`));
    } else {
      next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
    }
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const deletedCard = await Card.findByIdAndDelete(cardId).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(deletedCard);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} карточку!`));
    } else if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_DELETE} карточки!`));
    } else {
      next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
    }
  }
};

export const likeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const ownerId = req.user?._id;
    const patchedCard = await Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, { new: true }).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(patchedCard);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} карточку!`));
    } else if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_UPDATE} карточки!`));
    } else {
      next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
    }
  }
};

export const dislikeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const ownerId = req.user?._id as ObjectId;
    const patchedCard = await Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true }).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(patchedCard);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} карточку!`));
    } else if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_UPDATE} карточки!`));
    } else {
      next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
    }
  }
};

