import { Request, Response } from "express";
import { categoryService } from "../services";

class CategoryController {
  categoryCreator = async (req: Request, res: Response) => {
    const category = await categoryService.categoryCreator(req);
    return res.status(201).json(category);
  };

  categoriesLoader = async (req: Request, res: Response) => {
    const { status, categories } = await categoryService.categoriesLoader(req);
    return res.status(status).json(categories);
  };

  categoryLoader = async (req: Request, res: Response) => {
    const { status, category } = await categoryService.categoryLoader(req);
    return res.status(status).json(category);
  };

  categoryEditor = async (req: Request, res: Response) => {
    const category = await categoryService.categoryEditor(req);
    return res.status(200).json(category);
  };

  categoryDeletor = async (req: Request, res: Response) => {
    const { status, message } = await categoryService.categoryDeletor(req);
    return res.status(status).json(message);
  };
}

export default new CategoryController();
