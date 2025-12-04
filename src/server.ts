import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;
// parser
app.use(express.json());
// app.use(express.urlencoded());

//initializing DB
initDB();

// "/" --> localhost: 5000/
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Web Developer!");
});

// users CRUD
app.use("/users", userRoutes);

//todo crud
app.use("/todos", todoRoutes)


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
