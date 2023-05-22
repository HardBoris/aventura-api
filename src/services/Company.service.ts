import { Request } from "express";
import { Company } from "../entities";
import { companyRepository } from "../repositories";
import CompanyShape from "../shapes/Company.shape";
import { ErrorHandler, errorHandler } from "../errors";
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

  companiesLoader = async (req: Request) => {
    const companies: Company[] = await companyRepository.all();

    return {
      status: 200,
      companies: companies,
    };
  };

  companyLoader = async (req: Request) => {
    const company: Company = await companyRepository.findOne({
      companyCode: req.params.code,
    });
    return {
      status: 200,
      company: company,
    };
  };

  companyEditor = async (req: Request) => {
    const company: Company = await companyRepository.findOne({
      companyCode: req.params.code,
    });

    if (!company) {
      throw new ErrorHandler(404, "Company not found!");
    }

    const body = req.body;

    if (body.companyId) {
      throw new ErrorHandler(401, "companyId field cannot be modified!");
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== "companyCode") {
        company[key] = req.body[key];
      }
    });

    const updatedCompany = await companyRepository.save(company);

    return updatedCompany;
  };
}

export default new CompanyService();
