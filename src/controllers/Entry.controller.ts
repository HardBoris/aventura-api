import { Request, Response } from "express";
import { entryService } from "../services";

class EntryController {
  entryCreator = async (req: Request, res: Response) => {
    const entrada = await entryService.entryCreator(req);
    return res.status(201).json(entrada);
  };
  entriesLoader = async (req: Request, res: Response) => {
    const { status, entradas } = await entryService.entriesLoader(req);
    return res.status(status).json(entradas);
  };

  entryLoader = async (req: Request, res: Response) => {
    const { status, entrada } = await entryService.entryLoader(req);
    return res.status(status).json(entrada);
  };

  entryEditor = async (req: Request, res: Response) => {
    const { status, entrada } = await entryService.entryEditor(req);
    return res.status(status).json(entrada);
  };

  entryDeletor = async (req: Request, res: Response) => {
    const { status, message } = await entryService.entryDeletor(req);
    return res.status(status).json(message);
  };
}

export default new EntryController();
