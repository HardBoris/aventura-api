import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";

interface ICategoryRepo {
  save: (category: Partial<Category>) => Promise<Category>;
  all: (payload: object) => Promise<Category[]>;
  findOne: (payload: object) => Promise<Category>;
  delete: (id: string) => Promise<DeleteResult>;
}

class CategoryRepo implements ICategoryRepo {
  private ormRepo: Repository<Category>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Category);
  }

  save = async (category: Partial<Category>) =>
    await this.ormRepo.save(category);
  all = async (payload: object) =>
    await this.ormRepo.find({ where: { ...payload } });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new CategoryRepo();
