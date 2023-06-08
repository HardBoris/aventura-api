import { Request } from "express";
import { PurchaseElement } from "../entities";
import { companyRepository, purchaseElementRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { purchaseElementShape } from "../shapes";

class PurchaseElementService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  purchaseElementCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { elementName, purchaseId } = req.body;

    const element: PurchaseElement = await purchaseElementRepository.save({
      element: elementName,
      purchase: purchaseId,
      company: company,
    });

    return await purchaseElementShape.purchaseElementCreator.validate(element, {
      stripUnknown: true,
    });
  };

  purchaseElementsLoader = async (req: Request) => {
    const company = await this.Company(req);

    const elements: PurchaseElement[] = await purchaseElementRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      elements: elements,
    };
  };

  purchaseElementLoader = async (req: Request) => {
    const company = await this.Company(req);

    const element: PurchaseElement = await purchaseElementRepository.findOne({
      company: {
        code: company.code,
      },
      midiaId: req.params.midiaId,
    });
    return {
      status: 200,
      element: element,
    };
  };

  purchaseElementEditor = async (req: Request) => {
    const company = await this.Company(req);

    const element: PurchaseElement = await purchaseElementRepository.findOne({
      company: {
        code: company.code,
      },
      elementId: req.params.elementId,
    });

    if (!element) {
      throw new ErrorHandler(404, "Element not found!");
    }

    const body = req.body;

    if (body.elementId) {
      throw new ErrorHandler(400, "Field elementId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        element[key] = body[key];
      }
    });

    const updatedElement = await purchaseElementRepository.save(element);

    return updatedElement;
  };

  purchaseElementDeletor = async (req: Request) => {
    await purchaseElementRepository.delete(req.params.elementId);
    return {
      status: 200,
      message: "Element deleted",
    };
  };
}

export default new PurchaseElementService();
