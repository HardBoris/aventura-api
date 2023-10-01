import { PurchaseRequest } from "../entities/PurchaseRequest";
import { Request, Response } from "express";
import { prequestService } from "../services";

class PurchaseRequestController {
  prequestCreator = async (req: Request, res: Response) => {
    const prequest = await prequestService.prequestCreator(req);
    return res.status(201).json(prequest);
  };
  prequestsLoader = async (req: Request, res: Response) => {
    const { status, prequest } = await prequestService.prequestsLoader(req);
    return res.status(status).json(prequest);
  };

  prequestLoader = async (req: Request, res: Response) => {
    const { status, prequest } = await prequestService.prequestLoader(req);
    return res.status(status).json(prequest);
  };

  prequestEditor = async (req: Request, res: Response) => {
    const { status, prequest } = await prequestService.prequestEditor(req);
    return res.status(status).json(prequest);
  };

  prequestDeletor = async (req: Request, res: Response) => {
    const { status, message } = await prequestService.prequestDeletor(req);
    return res.status(status).json(message);
  };
}

export default new PurchaseRequestController();
