// higher order function return a function
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

//roles =["admin","user"]
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
      if (!token) {
        return res.status(500).json({
          message: "You are not allowed!!",
        });
      }
      const decoded = jwt.verify(token, config.secret!) as JwtPayload;
      console.log(decoded);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(500).json({
          error: "unauthorized!!!",
        });
      }
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
