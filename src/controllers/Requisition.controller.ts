import { Request, Response } from "express";
import { requisitionService } from "../services";

class RequisitionController {
  requisitionCreator = async (req: Request, res: Response) => {
    const pedido = await requisitionService.requisitionCreator(req);
    return res.status(201).json(pedido);
  };
  requisitionsLoader = async (req: Request, res: Response) => {
    const { status, pedidos } = await requisitionService.requisitionsLoader(
      req
    );
    return res.status(status).json(pedidos);
  };

  requisitionLoader = async (req: Request, res: Response) => {
    const { status, requisition } = await requisitionService.requisitionLoader(
      req
    );
    return res.status(status).json(requisition);
  };

  reqEditor = async (req: Request, res: Response) => {
    const { status, requisition } = await requisitionService.requisitionEditor(
      req
    );
    return res.status(status).json(requisition);
  };

  requisitionDeletor = async (req: Request, res: Response) => {
    const { status, message } = await requisitionService.requisitionDeletor(
      req
    );
    return res.status(status).json(message);
  };
}

export default new RequisitionController();
