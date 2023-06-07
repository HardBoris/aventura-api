import { Request } from "express";
import { Stuff } from "../entities";
import { companyRepository, stuffRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { stuffShape } from "../shapes";

class StuffService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  stuffCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { stuffName, measurementUnit, supplierId, purchaseId } = req.body;

    const stuff: Stuff = await stuffRepository.save({
      stuffName: stuffName,
      measurementUnit: measurementUnit,
      supplier: supplierId,
      purchase: purchaseId,
      company: company,
    });

    return await stuffShape.stuffCreator.validate(stuff, {
      stripUnknown: true,
    });
  };

  stuffsLoader = async (req: Request) => {
    const company = await this.Company(req);

    const stuffs: Stuff[] = await stuffRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      stuffs: stuffs,
    };
  };

  stuffLoader = async (req: Request) => {
    const company = await this.Company(req);

    const stuff: Stuff = await stuffRepository.findOne({
      company: {
        code: company.code,
      },
      stuffId: req.params.stuffId,
    });
    return {
      status: 200,
      stuff: stuff,
    };
  };

  stuffEditor = async (req: Request) => {
    const company = await this.Company(req);

    const stuff: Stuff = await stuffRepository.findOne({
      company: {
        code: company.code,
      },
      stuffId: req.params.stuffId,
    });

    if (!stuff) {
      throw new ErrorHandler(404, "Stuff not found!");
    }

    const body = req.body;

    if (body.stuffId) {
      throw new ErrorHandler(400, "Field stuffId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        stuff[key] = body[key];
      }
    });

    const updatedStuff = await stuffRepository.save(stuff);

    return updatedStuff;
  };

  stuffDeletor = async (req: Request) => {
    await stuffRepository.delete(req.params.stuffId);
    return {
      status: 200,
      message: "Stuff deleted",
    };
  };
}

export default new StuffService();
