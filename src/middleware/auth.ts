// higher order function return a function
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({
        message: "You are not allowed!!",
      });
    }
    const decoded = jwt.verify(token, config.secret!);
    console.log(decoded)
    next();
  };
};

export default auth;
