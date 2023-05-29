import { Request } from "express";
import { Supplier } from "../entities";
import { supplierRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { supplierShape } from "../shapes";

class SupplierService {
  supplierCreator = async (req: Request): Promise<any> => {
    const { companyCode, supplierName, supplierCNPJ } = req.body;

    const supplier: Supplier = await supplierRepository.save({
      supplierName: supplierName,
      supplierCNPJ: supplierCNPJ,
      company: companyCode,
    });

    return await supplierShape.supplierCreator.validate(supplier, {
      stripUnknown: true,
    });
  };

  suppliersLoader = async (req: Request) => {
    const suppliers: Supplier[] = await supplierRepository.all();

    return {
      status: 200,
      suppliers: suppliers,
    };
  };

  supplierLoader = async (req: Request) => {
    const supplier: Supplier = await supplierRepository.findOne({
      supplierId: req.params.id,
    });
    return {
      status: 200,
      supplier: supplier,
    };
  };

  supplierEditor = async (req: Request) => {
    const supplier: Supplier = await supplierRepository.findOne({
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

  userDeletor = async (req: Request) => {
    await supplierRepository.delete(req.params.id);
    return {
      status: 200,
      message: "Supplier deleted",
    };
  };
}

export default new SupplierService();
