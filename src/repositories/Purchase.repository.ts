import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Purchase } from "../entities";

interface IPurchaseRepo {
  save: (purchase: Partial<Purchase>) => Promise<Purchase>;
  all: (payload: object) => Promise<Purchase[]>;
  findOne: (payload: object) => Promise<Purchase>;
  delete: (id: string) => Promise<DeleteResult>;
}

class PurchaseRepo implements IPurchaseRepo {
  private ormRepo: Repository<Purchase>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Purchase);
  }

  save = async (purchase: Partial<Purchase>) =>
    await this.ormRepo.save(purchase);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: { supplier: true, stuffs: true, tools: true, midias: true },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new PurchaseRepo();
