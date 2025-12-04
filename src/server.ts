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


app.put("/todos/:id", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `UPDATE todos SET user_id=$1, title= $2 WHERE id=$3 RETURNING *`,
      [user_id, title, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "todo not found to update",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "todo updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "todo not to find for delete",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
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
