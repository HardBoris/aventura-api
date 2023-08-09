import { Request } from "express";
import {
  companyRepository,
  purchaseRepository,
  requisitionRepository,
  serviceOrderRepository,
  userRepository,
} from "../repositories";
import { Requisition } from "../entities";
import { ErrorHandler } from "../errors";
import UserRepository from "../repositories/User.repository";

class RequisitionService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  Requestor = async ({ body }: Request) => {
    const result = await userRepository.findOne({ name: body.requestor });
    return result;
  };

  Service = async ({ body }: Request) => {
    const result = await serviceOrderRepository.findOne({ order: body.order });
    return result;
  };

  requisitionCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const requestor = await this.Requestor(req);

    const body = req.body;

    let service = await this.Service(req);

    if (!service) {
      service = await serviceOrderRepository.save({
        order: body.service,
        company: company,
      });
    }

    const fecha = new Date(body.requestDate);

    const pedido: Requisition = await requisitionRepository.save({
      ...body,
      requestDate: fecha,
      company: company,
      requestor: requestor,
      service: service,
    });

    return pedido;
  };

  requisitionsLoader = async (req: Request) => {
    let pedidos: Requisition[] = await requisitionRepository.all();
    pedidos = pedidos.sort((a, b) =>
      a.requestId > b.requestId ? -1 : a.requestId < b.requestId ? 1 : 0
    );
    return {
      status: 200,
      pedidos: pedidos,
    };
  };

  requisitionLoader = async (req: Request) => {
    const requisition: Requisition = await requisitionRepository.findOne({
      requestId: req.params.requestId,
    });
    return { status: 200, requisition: requisition };
  };

  requisitionEditor = async (req: Request) => {
    const requisition: Requisition = await requisitionRepository.findOne({
      requestId: req.params.requestId,
    });
    const reqUpdated = {
      ...requisition,
      requestTarget: req.body.requestTarget,
      requestor: req.body.requestor,
      isDelivered: req.body.isDelivered,
    };
    await requisitionRepository.save(reqUpdated);
    return {
      status: 200,
      requisition: reqUpdated,
    };
  };

  requisitionDeletor = async (req: Request) => {
    const pedido: Requisition = await requisitionRepository.findOne({
      requestId: req.params.requestId,
    });

    if (!pedido) {
      throw new ErrorHandler(404, "Requisition not found");
    }

    await requisitionRepository.delete(req.params.requestId);

    return {
      status: 200,
      message: "Requisition deleted",
    };
  };
}

export default new RequisitionService();
