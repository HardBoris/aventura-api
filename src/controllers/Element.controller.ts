import { Request, Response } from "express";
import { elementService } from "../services";

class ElementController {
  elementCreator = async (req: Request, res: Response) => {
    const elemento = await elementService.elementCreator(req);
    return res.status(201).json(elemento);
  };
  elementsLoader = async (req: Request, res: Response) => {
    const { status, elementos } = await elementService.elementsLoader(req);
    return res.status(status).json(elementos);
  };

  elementLoader = async (req: Request, res: Response) => {
    const { status, elemento } = await elementService.elementLoader(req);
    return res.status(status).json(elemento);
  };

  elementEditor = async (req: Request, res: Response) => {
    const { status, elemento } = await elementService.elementEditor(req);
    return res.status(status).json(elemento);
  };

  elementDeletor = async (req: Request, res: Response) => {
    const { status, message } = await elementService.elementDeletor(req);
    return res.status(status).json(message);
  };
}

export default new ElementController();
