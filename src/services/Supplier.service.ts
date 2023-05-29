import { Request } from "express";
import { Supplier } from "../entities";
import { companyRepository, supplierRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { supplierShape } from "../shapes";

class SupplierService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  supplierCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { supplierName, supplierCNPJ } = req.body;

    const supplier: Supplier = await supplierRepository.save({
      supplierName: supplierName,
      supplierCNPJ: supplierCNPJ,
      company: company,
    });

    return await supplierShape.supplierCreator.validate(supplier, {
      stripUnknown: true,
    });
  };

  suppliersLoader = async (req: Request) => {
    const company = await this.Company(req);

    const suppliers: Supplier[] = await supplierRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      suppliers: suppliers,
    };
  };

  supplierLoader = async (req: Request) => {
    const company = await this.Company(req);

    const supplier: Supplier = await supplierRepository.findOne({
      company: {
        code: company.code,
      },
      supplierId: req.params.id,
    });
    return {
      status: 200,
      supplier: supplier,
    };
  };

  supplierEditor = async (req: Request) => {
    const company = await this.Company(req);

    const supplier: Supplier = await supplierRepository.findOne({
      company: {
        code: company.code,
      },
      supplierId: req.params.id,
    });

    if (!supplier) {
      throw new ErrorHandler(404, "Supplier not found!");
    }

    const body = req.body;

    if (body.supplierId) {
      throw new ErrorHandler(400, "Field supplierId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] && key !== "supplierCNPJ") {
        supplier[key] = body[key];
      }
    });

    const updatedSupplier = await supplierRepository.save(supplier);

    return updatedSupplier;
  };

  supplierDeletor = async (req: Request) => {
    await supplierRepository.delete(req.params.id);
    return {
      status: 200,
      message: "Supplier deleted",
    };
  };
}

export default new SupplierService();
