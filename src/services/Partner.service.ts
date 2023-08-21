import { Request } from "express";
import { Partner } from "../entities";
import { companyRepository, partnerRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { partnerShape } from "../shapes";

class PartnerService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  partnerCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { fantasyName, CNPJ } = req.body;

    const partner: Partner = await partnerRepository.save({
      fantasyName: fantasyName,
      CNPJ: CNPJ,
      company: company,
    });

    return await partnerShape.partnerCreator.validate(partner, {
      stripUnknown: true,
    });
  };

  partnersLoader = async (req: Request) => {
    const company = await this.Company(req);

    const partners: Partner[] = await partnerRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      partners: partners,
    };
  };

  partnerLoader = async (req: Request) => {
    const company = await this.Company(req);

    const partner: Partner = await partnerRepository.findOne({
      company: {
        code: company.code,
      },
      partnerId: req.params.id,
    });
    return {
      status: 200,
      partner: partner,
    };
  };

  partnerEditor = async (req: Request) => {
    const company = await this.Company(req);

    const partner: Partner = await partnerRepository.findOne({
      company: {
        code: company.code,
      },
      partnerId: req.params.id,
    });

    if (!partner) {
      throw new ErrorHandler(404, "Partner not found!");
    }

    const body = req.body;

    if (body.partnerId) {
      throw new ErrorHandler(400, "Field partnerId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] && key !== "CNPJ") {
        partner[key] = body[key];
      }
    });

    const updatedPartner = await partnerRepository.save(partner);

    return updatedPartner;
  };

  partnerDeletor = async (req: Request) => {
    await partnerRepository.delete(req.params.id);
    return {
      status: 200,
      message: "Partner deleted",
    };
  };
}

export default new PartnerService();
