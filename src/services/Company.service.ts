import { Request } from "express";
import { Company } from "../entities";
import { companyRepository } from "../repositories";
import CompanyShape from "../shapes/Company.shape";
// import { AssertsShape } from "yup/lib/object";

class CompanyService {
  companyCreator = async (req: Request): Promise<any> => {
    const { companyEmail, companyName } = req.body;

    let companyCode = Math.ceil(Math.random() * 999999).toString();

    companyCode.length < 6
      ? (companyCode = "0".repeat(6 - companyCode.length) + companyCode)
      : companyCode;

    const company: Company = await companyRepository.save({
      companyEmail: companyEmail,
      companyName: companyName,
      companyCode: companyCode,
    });

    return await CompanyShape.companyCreator.validate(company, {
      stripUnknown: true,
    });
  };

  companyLoader = async (req: Request) => {
    const company: Company[] = await companyRepository.all();

    return {
      status: 200,
      company: company,
    };
  };
}

export default new CompanyService();
