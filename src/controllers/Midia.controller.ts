import { Request, Response } from "express";
import { midiaService } from "../services";

class MidiaController {
  midiaCreator = async (req: Request, res: Response) => {
    const midia = await midiaService.midiaCreator(req);
    return res.status(201).json(midia);
  };

  midiasLoader = async (req: Request, res: Response) => {
    const { status, midias } = await midiaService.midiasLoader(req);
    return res.status(status).json(midias);
  };

  midiaLoader = async (req: Request, res: Response) => {
    const { status, midia } = await midiaService.midiaLoader(req);
    return res.status(status).json(midia);
  };

  midiaEditor = async (req: Request, res: Response) => {
    const midia = await midiaService.midiaEditor(req);
    return res.status(200).json(midia);
  };

  midiaDeletor = async (req: Request, res: Response) => {
    const { status, message } = await midiaService.midiaDeletor(req);
    return res.status(status).json(message);
  };
}

export default new MidiaController();
