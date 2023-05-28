import { Request, Response } from "express";
import { supplierService } from "../services";

class SupplierController {
  supplierCreator = async (req: Request, res: Response) => {
    const supplier = await supplierService.supplierCreator(req);
    return res.status(201).json(supplier);
  };

  suppliersLoader = async (req: Request, res: Response) => {
    const { status, suppliers } = await supplierService.suppliersLoader(req);
    return res.status(status).json(suppliers);
  };

  supplierLoader = async (req: Request, res: Response) => {
    const { status, supplier } = await supplierService.supplierLoader(req);
    return res.status(status).json(supplier);
  };

  supplierEditor = async (req: Request, res: Response) => {
    const supplier = await supplierService.supplierEditor(req);
    return res.status(200).json(supplier);
  };
}

export default new SupplierController();
