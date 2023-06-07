import { Request, Response } from "express";
import { stuffService } from "../services";

class StuffController {
  stuffCreator = async (req: Request, res: Response) => {
    const stuff = await stuffService.stuffCreator(req);
    return res.status(201).json(stuff);
  };

  stuffsLoader = async (req: Request, res: Response) => {
    const { status, stuffs } = await stuffService.stuffsLoader(req);
    return res.status(status).json(stuffs);
  };

  stuffLoader = async (req: Request, res: Response) => {
    const { status, stuff } = await stuffService.stuffLoader(req);
    return res.status(status).json(stuff);
  };

  stuffEditor = async (req: Request, res: Response) => {
    const stuff = await stuffService.stuffEditor(req);
    return res.status(200).json(stuff);
  };

  stuffDeletor = async (req: Request, res: Response) => {
    const { status, message } = await stuffService.stuffDeletor(req);
    return res.status(status).json(message);
  };
}

export default new StuffController();
