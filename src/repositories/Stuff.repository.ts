import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Stuff } from "../entities";

interface IStuffRepo {
  save: (stuff: Partial<Stuff>) => Promise<Stuff>;
  all: (payload: object) => Promise<Stuff[]>;
  findOne: (payload: object) => Promise<Stuff>;
  delete: (id: string) => Promise<DeleteResult>;
}

class StuffRepo implements IStuffRepo {
  private ormRepo: Repository<Stuff>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Stuff);
  }

  save = async (stuff: Partial<Stuff>) => await this.ormRepo.save(stuff);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: {
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

export default new StuffRepo();
