import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
const router = express.Router();

// app.use("/users", userRoutes)

// routes --> controller --> service

router.post("/", userControllers.createUser);

router.get("/", userControllers.getUser);

export const userRoutes = router;
