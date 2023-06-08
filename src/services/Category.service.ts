import { Request } from "express";
import { Category } from "../entities";
import { categoryRepository, companyRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { categoryShape } from "../shapes";

class CategoryService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  categoryCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { categoryReference, deliveryDate, supplierId } = req.body;

    const fecha = new Date(deliveryDate);

    const category: Category = await categoryRepository.save({
      category: categoryReference,
      company: company,
    });

    return await categoryShape.categoryCreator.validate(category, {
      stripUnknown: true,
    });
  };

  categoriesLoader = async (req: Request) => {
    const company = await this.Company(req);

    const categories: Category[] = await categoryRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      categories: categories,
    };
  };

  categoryLoader = async (req: Request) => {
    const company = await this.Company(req);

    const category: Category = await categoryRepository.findOne({
      company: {
        code: company.code,
      },
      categoryId: req.params.id,
    });
    return {
      status: 200,
      category: category,
    };
  };

  categoryEditor = async (req: Request) => {
    const company = await this.Company(req);

    const category: Category = await categoryRepository.findOne({
      company: {
        code: company.code,
      },
      categoryId: req.params.id,
    });

    if (!category) {
      throw new ErrorHandler(404, "Category not found!");
    }

    const body = req.body;

    if (body.categoryId) {
      throw new ErrorHandler(400, "Field categoryId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] && key !== "supplierCNPJ") {
        category[key] = body[key];
      }
    });

    const updatedCategory = await categoryRepository.save(category);

    return updatedCategory;
  };

  categoryDeletor = async (req: Request) => {
    await categoryRepository.delete(req.params.id);
    return {
      status: 200,
      message: "Category deleted",
    };
  };
}

export default new CategoryService();
