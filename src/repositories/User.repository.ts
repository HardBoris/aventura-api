import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

interface IUserRepo {
  save: (user: Partial<User>) => Promise<User>;
  all: (payload: object) => Promise<User[]>;
  findOne: (payload: object) => Promise<User>;
  delete: (id: string) => Promise<DeleteResult>;
}

class UserRepo implements IUserRepo {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => await this.ormRepo.save(user);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: {
        entries: true,
        requisitions: true,
      },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new UserRepo();
