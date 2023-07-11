import { NextFunction, Response } from "express";
import { ICustomRequest } from "../utils/types";


export const tempAuth = (req: ICustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '64acfb2f07737390d3b1e912'
  };

  next();
}