import { DeleteResult, Repository } from "typeorm";
import { PurchaseRequest } from "../entities";
import { AppDataSource } from "../data-source";

interface IPRRepo {
  save: (prequest: Partial<PurchaseRequest>) => Promise<PurchaseRequest>;
  all: (payload: object) => Promise<PurchaseRequest[]>;
  findOne: (payload: object) => Promise<PurchaseRequest>;
  delete: (id: string) => Promise<DeleteResult>;
}

class PurchaseRequestRepo implements IPRRepo {
  private ormRepo: Repository<PurchaseRequest>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(PurchaseRequest);
  }

  save = async (purchaseElement: Partial<PurchaseRequest>) =>
    await this.ormRepo.save(purchaseElement);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: {
        requestor: true,
        details: true,
      },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new PurchaseRequestRepo();
