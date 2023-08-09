import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Requisition } from "../entities";

interface IRequisitionRepo {
  save: (pedido: Partial<Requisition>) => Promise<Requisition>;
  all: () => Promise<Requisition[]>;
  findOne: (payload: object) => Promise<Requisition>;
  delete: (id: string) => Promise<DeleteResult>;
}

class RequisitionRepo implements IRequisitionRepo {
  private ormRepo: Repository<Requisition>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Requisition);
  }

  save = async (pedido: Partial<Requisition>) =>
    await this.ormRepo.save(pedido);
  all = async () =>
    await this.ormRepo.find({
      relations: { movements: true, service: true, requestor: true },
    });
  findOne = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
  delete = async (id: string) => await this.ormRepo.delete(id);
}

export default new RequisitionRepo();
