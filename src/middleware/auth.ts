// higher order function return a function
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
      if (!token) {
        return res.status(500).json({
          message: "You are not allowed!!",
        });
      }
      const decoded = jwt.verify(token, config.secret!);
      console.log(decoded);
      req.user = decoded as JwtPayload;
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
