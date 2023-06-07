import { Request } from "express";
import { Midia } from "../entities";
import { companyRepository, midiaRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { midiaShape } from "../shapes";

class MidiaService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  midiaCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { midiaName, measurementUnit, supplierId, purchaseId } = req.body;

    const midia: Midia = await midiaRepository.save({
      midiaName: midiaName,
      measurementUnit: measurementUnit,
      supplier: supplierId,
      purchase: purchaseId,
      company: company,
    });

    return await midiaShape.midiaCreator.validate(midia, {
      stripUnknown: true,
    });
  };

  midiasLoader = async (req: Request) => {
    const company = await this.Company(req);

    const midias: Midia[] = await midiaRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      midias: midias,
    };
  };

  midiaLoader = async (req: Request) => {
    const company = await this.Company(req);

    const midia: Midia = await midiaRepository.findOne({
      company: {
        code: company.code,
      },
      midiaId: req.params.midiaId,
    });
    return {
      status: 200,
      midia: midia,
    };
  };

  midiaEditor = async (req: Request) => {
    const company = await this.Company(req);

    const midia: Midia = await midiaRepository.findOne({
      company: {
        code: company.code,
      },
      midiaId: req.params.midiaId,
    });

    if (!midia) {
      throw new ErrorHandler(404, "Midia not found!");
    }

    const body = req.body;

    if (body.midiaId) {
      throw new ErrorHandler(400, "Field midiaId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        midia[key] = body[key];
      }
    });

    const updatedMidia = await midiaRepository.save(midia);

    return updatedMidia;
  };

  midiaDeletor = async (req: Request) => {
    await midiaRepository.delete(req.params.midiaId);
    return {
      status: 200,
      message: "Midia deleted",
    };
  };
}

export default new MidiaService();
