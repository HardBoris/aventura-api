import { Request } from "express";
import { ServiceOrder } from "../entities";
import { serviceOrderRepository, companyRepository } from "../repositories";
import { ErrorHandler } from "../errors";

class ServiceOrderService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  ServiceOrderCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const serviceOrder: ServiceOrder = await serviceOrderRepository.save({
      order: req.body.order,
      company: company,
    });

    return serviceOrder;
  };

  OrderListLoader = async (req: Request) => {
    const company = await this.Company(req);

    const orderList: ServiceOrder[] = await serviceOrderRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      orderList: orderList,
    };
  };

  ServiceOrderLoader = async (req: Request) => {
    const company = await this.Company(req);

    const serviceOrder: ServiceOrder = await serviceOrderRepository.findOne({
      company: {
        code: company.code,
      },
      serviceOrderId: req.params.orderId,
    });
    return {
      status: 200,
      serviceOrder: serviceOrder,
    };
  };

  ServiceOrderEditor = async (req: Request) => {
    const company = await this.Company(req);

    const serviceOrder: ServiceOrder = await serviceOrderRepository.findOne({
      company: {
        code: company.code,
      },
      serviceOrderId: req.params.orderId,
    });

    if (!serviceOrder) {
      throw new ErrorHandler(404, "Service Order not found!");
    }

    const body = req.body;

    if (body.serviceOrderId) {
      throw new ErrorHandler(400, "Field serviceOrderId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] && key !== "supplierCNPJ") {
        ServiceOrder[key] = body[key];
      }
    });

    const updatedServiceOrder = await serviceOrderRepository.save(serviceOrder);

    return updatedServiceOrder;
  };

  ServiceOrderDeletor = async (req: Request) => {
    await serviceOrderRepository.delete(req.params.orderId);
    return {
      status: 200,
      message: "Service Order deleted",
    };
  };
}

export default new ServiceOrderService();
