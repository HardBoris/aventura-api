import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ServiceOrder } from "../entities";

interface IServiceOrderRepo {
  save: (service_order: Partial<ServiceOrder>) => Promise<ServiceOrder>;
  all: (payload: object) => Promise<ServiceOrder[]>;
  findOne: (payload: object) => Promise<ServiceOrder>;
  delete: (id: string) => Promise<DeleteResult>;
}

class ServiceOrderRepo implements IServiceOrderRepo {
  private ormRepo: Repository<ServiceOrder>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(ServiceOrder);
  }

  save = async (service_order: Partial<ServiceOrder>) =>
    await this.ormRepo.save(service_order);
  all = async (payload: object) => await this.ormRepo.find({ ...payload });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new ServiceOrderRepo();
