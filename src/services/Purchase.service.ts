import { Request } from "express";
import { Purchase } from "../entities";
import { companyRepository, purchaseRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { purchaseShape } from "../shapes";

class PurchaseService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  purchaseCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const body = req.body;
    console.log(body);

    const fecha = new Date(body.deliveryDate);

    const purchase: Purchase = await purchaseRepository.save({
      ...body,
      deliveryDate: fecha,
      supplier: body.supplierId,
      company: company,
    });

    return await purchaseShape.purchaseCreator.validate(purchase, {
      stripUnknown: true,
    });
  };

  purchasesLoader = async (req: Request) => {
    const company = await this.Company(req);

    const purchases: Purchase[] = await purchaseRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      purchases: purchases,
    };
  };

  purchaseLoader = async (req: Request) => {
    const company = await this.Company(req);

    const purchase: Purchase = await purchaseRepository.findOne({
      company: {
        code: company.code,
      },
      purchaseId: req.params.id,
    });
    return {
      status: 200,
      purchase: purchase,
    };
  };

  purchaseEditor = async (req: Request) => {
    const company = await this.Company(req);

    const purchase: Purchase = await purchaseRepository.findOne({
      company: {
        code: company.code,
      },
      purchaseId: req.params.id,
    });

    if (!purchase) {
      throw new ErrorHandler(404, "Purchase not found!");
    }

    const body = req.body;

    if (body.purchaseId) {
      throw new ErrorHandler(400, "Field purchaseId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] && key !== "supplierCNPJ") {
        purchase[key] = body[key];
      }
    });

    const updatedPurchase = await purchaseRepository.save(purchase);

    return updatedPurchase;
  };

  purchaseDeletor = async (req: Request) => {
    await purchaseRepository.delete(req.params.purchaseId);
    return {
      status: 200,
      message: "Purchase deleted",
    };
  };
}

export default new PurchaseService();
