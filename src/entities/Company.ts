import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import {
  Entry,
  Midia,
  Movement,
  Purchase,
  Requisition,
  Stuff,
  Tool,
  User,
} from "./index";
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

  @OneToMany(() => User, (user) => user.company, { cascade: true, eager: true })
  users: User[];

  @OneToMany(() => Supplier, (supplier) => supplier.company, {
    cascade: true,
    eager: true,
  })
  suppliers: Supplier[];

  @OneToMany(() => Purchase, (purchase) => purchase.company, {
    cascade: true,
    eager: true,
  })
  purchases: Purchase[];

  @OneToMany(() => Stuff, (stuff) => stuff.company, {
    cascade: true,
    eager: true,
  })
  stuffs: Stuff[];

  @OneToMany(() => Midia, (midia) => midia.company, {
    cascade: true,
    eager: true,
  })
  midias: Midia[];

  @OneToMany(() => Tool, (tool) => tool.company, { cascade: true, eager: true })
  tools: Tool[];

  @OneToMany(() => Requisition, (requisition) => requisition.company, {
    cascade: true,
    eager: true,
  })
  requisitions: Requisition[];

  @OneToMany(() => Movement, (movement) => movement.company, {
    cascade: true,
    eager: true,
  })
  movements: Movement[];

  @OneToMany(() => Entry, (entry) => entry.company, {
    cascade: true,
    eager: true,
  })
  entries: Entry[];
}
