import { Request, Response } from "express";
import { partnerService } from "../services";

class PartnerController {
  partnerCreator = async (req: Request, res: Response) => {
    const partner = await partnerService.partnerCreator(req);
    return res.status(201).json(partner);
  };

  partnersLoader = async (req: Request, res: Response) => {
    const { status, partners } = await partnerService.partnersLoader(req);
    return res.status(status).json(partners);
  };

  partnerLoader = async (req: Request, res: Response) => {
    const { status, partner } = await partnerService.partnerLoader(req);
    return res.status(status).json(partner);
  };

  partnerEditor = async (req: Request, res: Response) => {
    const partner = await partnerService.partnerEditor(req);
    return res.status(200).json(partner);
  };

  partnerDeletor = async (req: Request, res: Response) => {
    const { status, message } = await partnerService.partnerDeletor(req);
    return res.status(status).json(message);
  };
}

export default new PartnerController();
