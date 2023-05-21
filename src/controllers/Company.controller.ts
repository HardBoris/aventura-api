import { Request, Response } from "express";
import { companyService } from "../services";

class CompanyController {
  companyCreator = async (req: Request, res: Response) => {
    const company = await companyService.companyCreator(req);
    return res.status(201).json(company);
  };

  companyLoader = async (req: Request, res: Response) => {
    const { status, company } = await companyService.companyLoader(req);
    return res.status(status).json(company);
  };
}

export default new CompanyController();
