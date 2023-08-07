import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Midia, Purchase, Stuff, Tool, User } from "./index";
import { Supplier } from "./index";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  companyId?: string;

  @Column({ nullable: true })
  companyName?: string;

  @Column({ unique: true })
  companyEmail: string;

  @Column({ unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, (user) => user.company, { cascade: true })
  users: User[];

  @OneToMany(() => Supplier, (supplier) => supplier.company, { cascade: true })
  suppliers: Supplier[];

  @OneToMany(() => Purchase, (purchase) => purchase.company, { cascade: true })
  purchases: Purchase[];

  @OneToMany(() => Stuff, (stuff) => stuff.company, { cascade: true })
  stuffs: Stuff[];

  @OneToMany(() => Midia, (midia) => midia.company, { cascade: true })
  midias: Midia[];

  @OneToMany(() => Tool, (tool) => tool.company, { cascade: true })
  tools: Tool[];
}
