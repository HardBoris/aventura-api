import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Supplier } from "./Supplier";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  companyId?: string;

  @Column()
  companyName?: string;

  @Column({ unique: true })
  companyEmail: string;

  @Column()
  companyPassword: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, (user) => user.company, { eager: true })
  users: User[];

  @OneToMany(() => Supplier, (supplier) => supplier.company, { eager: true })
  suppliers: Supplier[];

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.companyPassword);
  };
}
