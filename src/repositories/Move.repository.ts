import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities";

interface IMoveRepo {
  save: (move: Partial<Movement>) => Promise<Movement>;
  all: () => Promise<Movement[]>;
  selected: (payload: object) => Promise<Movement[]>;
  findOne: (payload: object) => Promise<Movement>;
  delete: (id: string) => Promise<DeleteResult>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
}

class MoveRepo implements IMoveRepo {
  private ormRepo: Repository<Movement>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Movement);
  }

  save = async (move: Partial<Movement>) => await this.ormRepo.save(move);
  all = async () =>
    await this.ormRepo.find({ relations: { requisition: true, entry: true } });
  selected = async (payload: object) => await this.ormRepo.find({ ...payload });
  findOne = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
  delete = async (id: string) => await this.ormRepo.delete(id);
  update = async (id: string, payload: object) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new MoveRepo();
