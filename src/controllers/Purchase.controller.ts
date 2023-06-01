import { Request, Response } from "express";
import { purchaseService } from "../services";

class PurchaseController {
  purchaseCreator = async (req: Request, res: Response) => {
    const purchase = await purchaseService.purchaseCreator(req);
    return res.status(201).json(purchase);
  };

  purchasesLoader = async (req: Request, res: Response) => {
    const { status, purchases } = await purchaseService.purchasesLoader(req);
    return res.status(status).json(purchases);
  };

  purchaseLoader = async (req: Request, res: Response) => {
    const { status, purchase } = await purchaseService.purchaseLoader(req);
    return res.status(status).json(purchase);
  };

  purchaseEditor = async (req: Request, res: Response) => {
    const purchase = await purchaseService.purchaseEditor(req);
    return res.status(200).json(purchase);
  };

  purchaseDeletor = async (req: Request, res: Response) => {
    const { status, message } = await purchaseService.purchaseDeletor(req);
    return res.status(status).json(message);
  };
}

export default new PurchaseController();
