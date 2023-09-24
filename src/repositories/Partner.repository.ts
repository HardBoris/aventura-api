import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Partner } from "../entities";

interface IPartnerRepo {
  save: (partner: Partial<Partner>) => Promise<Partner>;
  all: (payload: object) => Promise<Partner[]>;
  findOne: (payload: object) => Promise<Partner>;
  delete: (id: string) => Promise<DeleteResult>;
}

class PartnerRepo implements IPartnerRepo {
  private ormRepo: Repository<Partner>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Partner);
  }

  save = async (partner: Partial<Partner>) => await this.ormRepo.save(partner);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: { purchases: true },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new PartnerRepo();
