import { Request, Response } from "express";
import { orderService } from "../services";

class ServiceOrderController {
  ServiceOrderCreator = async (req: Request, res: Response) => {
    const serviceOrder = await orderService.ServiceOrderCreator(req);
    return res.status(201).json(serviceOrder);
  };

  OrderListLoader = async (req: Request, res: Response) => {
    const { status, orderList } = await orderService.OrderListLoader(req);
    return res.status(status).json(orderList);
  };

  ServiceOrderLoader = async (req: Request, res: Response) => {
    const { status, serviceOrder } = await orderService.ServiceOrderLoader(req);
    return res.status(status).json(serviceOrder);
  };

  ServiceOrderEditor = async (req: Request, res: Response) => {
    const serviceOrder = await orderService.ServiceOrderEditor(req);
    return res.status(200).json(serviceOrder);
  };

  ServiceOrderDeletor = async (req: Request, res: Response) => {
    const { status, message } = await orderService.ServiceOrderDeletor(req);
    return res.status(status).json(message);
  };
}

export default new ServiceOrderController();
