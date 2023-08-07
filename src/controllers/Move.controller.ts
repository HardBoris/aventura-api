import { Request, Response } from "express";
import { moveService } from "../services";

class MoveController {
  moveCreator = async (req: Request, res: Response) => {
    const move = await moveService.moveCreator(req);
    return res.status(201).json(move);
  };
  movementsLoader = async (req: Request, res: Response) => {
    const { status, movements } = await moveService.movementsLoader(req);
    return res.status(status).json(movements);
  };

  selectedLoader = async (req: Request, res: Response) => {
    const { status, selected } = await moveService.selectedLoader(req);
    return res.status(status).json(selected);
  };

  moveLoader = async (req: Request, res: Response) => {
    const { status, move } = await moveService.moveLoader(req);
    return res.status(status).json(move);
  };

  moveEditor = async (req: Request, res: Response) => {
    const { status, move } = await moveService.moveEditor(req);
    return res.status(status).json(move);
  };

  moveDeletor = async (req: Request, res: Response) => {
    const { status, message } = await moveService.moveDeletor(req);
    return res.status(status).json(message);
  };
}

export default new MoveController();
