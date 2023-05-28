import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Supplier } from "../entities";

interface ISupplierRepo {
  save: (supplier: Partial<Supplier>) => Promise<Supplier>;
  all: () => Promise<Supplier[]>;
  findOne: (payload: object) => Promise<Supplier>;
  delete: (id: string) => Promise<DeleteResult>;
}

class SupplierRepo implements ISupplierRepo {
  private ormRepo: Repository<Supplier>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Supplier);
  }

  save = async (supplier: Partial<Supplier>) =>
    await this.ormRepo.save(supplier);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new SupplierRepo();
