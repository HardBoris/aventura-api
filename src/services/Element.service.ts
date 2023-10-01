import { Request } from "express";
import {
  companyRepository,
  elementRepository,
  purchaseRepository,
  userRepository,
} from "../repositories";
import { Company, Element, Purchase, User } from "../entities";
import { ErrorHandler } from "../errors";

class ElementService {
  Company = async ({ params }: Request) => {
    const result: Company = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  Responsivel = async (req: Request) => {
    const result: User = await userRepository.findOne({
      name: req.body.responsivel,
    });
    return result;
  };

  Purchase = async (req: Request) => {
    const result: Purchase = await purchaseRepository.findOne({
      purchaseId: req.body.purchase,
    });
    return result;
  };

  elementCreator = async (req: Request): Promise<any> => {
    const body = req.body;
    const fecha = new Date(body.elementDate);
    const responsable = await this.Responsivel(req);
    const company = await this.Company(req);
    const purchase = await this.Purchase(req);

    const elemento: Element = await elementRepository.save({
      ...body,
      elementDate: fecha,
      company: company,
      responsivel: responsable.userId,
      purchase: purchase ? purchase.purchaseId : "2",
    });

    return elemento;
  };

  elementsLoader = async (req: Request) => {
    let elementos: Element[] = await elementRepository.all();
    elementos = elementos.sort((a, b) =>
      a.elementId > b.elementId ? -1 : a.elementId < b.elementId ? 1 : 0
    );
    return {
      status: 200,
      elementos: elementos,
    };
  };

  elementLoader = async (req: Request) => {
    const elemento: Element = await elementRepository.findOne({
      elementId: req.params.elementId,
    });
    return { status: 200, elemento: elemento };
  };

  elementEditor = async (req: Request) => {
    const elemento: Element = await elementRepository.findOne({
      elementId: req.params.elementId,
    });
    const elementUpdated = {
      ...elemento,
      invoice: req.body.invoice,
      seller: req.body.seller,
      isReceived: req.body.isReceived,
    };
    await elementRepository.save(elementUpdated);
    return {
      status: 200,
      elemento: elementUpdated,
    };
  };

  elementDeletor = async (req: Request) => {
    const elemento: Element = await elementRepository.findOne({
      elementId: req.params.elementId,
    });

    if (!elemento) {
      throw new ErrorHandler(404, "Element not found");
    }

    await elementRepository.delete(req.params.elementId);

    return {
      status: 200,
      message: "Element deleted",
    };
  };
}

export default new ElementService();
