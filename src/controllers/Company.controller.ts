import { Request, Response } from "express";
import { companyService } from "../services";

class CompanyController {
  companyCreator = async (req: Request, res: Response) => {
    const company = await companyService.companyCreator(req);
    return res.status(201).json(company);
  };

  companiesLoader = async (req: Request, res: Response) => {
    const { status, companies } = await companyService.companiesLoader(req);
    return res.status(status).json(companies);
  };

  companyLoader = async (req: Request, res: Response) => {
    const { status, company } = await companyService.companyLoader(req);
    return res.status(status).json(company);
  };

  companyEditor = async (req: Request, res: Response) => {
    const company = await companyService.companyEditor(req);
    return res.status(200).json(company);
  };
}

export default new CompanyController();
