import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PurchaseElement } from "../entities";

interface IPurchaseElementRepo {
  save: (purchaseElement: Partial<PurchaseElement>) => Promise<PurchaseElement>;
  all: (payload: object) => Promise<PurchaseElement[]>;
  findOne: (payload: object) => Promise<PurchaseElement>;
  delete: (id: string) => Promise<DeleteResult>;
}

class PurchaseElementRepo implements IPurchaseElementRepo {
  private ormRepo: Repository<PurchaseElement>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(PurchaseElement);
  }

  save = async (purchaseElement: Partial<PurchaseElement>) =>
    await this.ormRepo.save(purchaseElement);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: {
        prequest: true,
        element: true,
      },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new PurchaseElementRepo();
