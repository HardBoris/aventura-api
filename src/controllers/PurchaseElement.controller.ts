import { Request, Response } from "express";
import { purchaseElementService } from "../services";

class PurchaseElementController {
  purchaseElementCreator = async (req: Request, res: Response) => {
    const element = await purchaseElementService.purchaseElementCreator(req);
    return res.status(201).json(element);
  };

  purchaseElementsLoader = async (req: Request, res: Response) => {
    const { status, elements } =
      await purchaseElementService.purchaseElementsLoader(req);
    return res.status(status).json(elements);
  };

  purchaseElementLoader = async (req: Request, res: Response) => {
    const { status, element } =
      await purchaseElementService.purchaseElementLoader(req);
    return res.status(status).json(element);
  };

  purchaseElementEditor = async (req: Request, res: Response) => {
    const element = await purchaseElementService.purchaseElementEditor(req);
    return res.status(200).json(element);
  };

  purchaseElementDeletor = async (req: Request, res: Response) => {
    const { status, message } =
      await purchaseElementService.purchaseElementDeletor(req);
    return res.status(status).json(message);
  };
}

export default new PurchaseElementController();
