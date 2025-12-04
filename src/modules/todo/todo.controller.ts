import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {

  try {
    const result = await todoServices.createTodo(req.body);
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();
    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Single todo fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.updateTodo(
      user_id,
      title,
      req.params.id as string
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
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req.params.id as string);
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
};
export const todoControllers = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo
};
