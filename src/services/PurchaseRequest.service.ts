import { Request } from "express";
import { PurchaseRequest } from "../entities";
import { companyRepository, prequestRepository } from "../repositories";
import { ErrorHandler } from "../errors";

class PurchaseRequestService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  prequestCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const prequest: PurchaseRequest = await prequestRepository.save({
      ...req.body,
    });

    /* return await purchaseElementShape.purchaseElementCreator.validate(prequest, {
      stripUnknown: true,
    }); */

    return prequest;
  };

  prequestsLoader = async (req: Request) => {
    const company = await this.Company(req);

    const prequest: PurchaseRequest[] = await prequestRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      prequest: prequest,
    };
  };

  prequestLoader = async (req: Request) => {
    const company = await this.Company(req);

    const prequest: PurchaseRequest = await prequestRepository.findOne({
      company: {
        code: company.code,
      },
      midiaId: req.params.midiaId,
    });
    return {
      status: 200,
      prequest: prequest,
    };
  };

  prequestEditor = async (req: Request) => {
    const company = await this.Company(req);

    const prequest: PurchaseRequest = await prequestRepository.findOne({
      company: {
        code: company.code,
      },
      prequestId: req.params.prequestId,
    });

    if (!prequest) {
      throw new ErrorHandler(404, "Purchase Request not found!");
    }

    const body = req.body;

    if (body.prequestId) {
      throw new ErrorHandler(400, "Field prequestId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        prequest[key] = body[key];
      }
    });

    const updatedPrequest = await prequestRepository.save(prequest);

    return updatedPrequest;
  };

  prequestDeletor = async (req: Request) => {
    await prequestRepository.delete(req.params.prequestId);
    return {
      status: 200,
      message: "Purchase Request deleted",
    };
  };
}

export default new PurchaseRequestService();
