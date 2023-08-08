import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Entry } from "../entities";

interface IEntryRepo {
  save: (entrada: Partial<Entry>) => Promise<Entry>;
  all: () => Promise<Entry[]>;
  findOne: (payload: object) => Promise<Entry>;
  delete: (id: string) => Promise<DeleteResult>;
}

class EntryRepo implements IEntryRepo {
  private ormRepo: Repository<Entry>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Entry);
  }

  save = async (entrada: Partial<Entry>) => await this.ormRepo.save(entrada);
  all = async () =>
    await this.ormRepo.find({ relations: { movements: true, purchase: true } });
  findOne = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
  delete = async (id: string) => await this.ormRepo.delete(id);
}

export default new EntryRepo();
