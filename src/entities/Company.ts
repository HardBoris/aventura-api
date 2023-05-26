import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./index";
// import { Supplier } from "./index";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  companyId?: string;

  @Column({ nullable: true })
  companyName?: string;

  @Column({ unique: true })
  companyEmail: string;

  @Column({ unique: true })
  companyCode?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, (user) => user.company, { eager: true })
  users: User[];

  /* @OneToMany(() => Supplier, (supplier) => supplier.company, { eager: true })
  suppliers: Supplier[]; */
}
