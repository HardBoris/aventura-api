import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "./Purchase";
import { Supplier } from "./Supplier";
import { Company } from "./Company";
import { Category } from "./Category";

@Entity("tools")
export class Tool {
  @PrimaryGeneratedColumn("uuid")
  toolId?: string;

  @Column()
  tool: string;

  @Column({ nullable: true })
  toolModel?: string;

  @Column({ nullable: true })
  toolPower?: string;

  @ManyToOne((type) => Supplier)
  @JoinColumn({ name: "supplierId" })
  supplier: Supplier;

  @ManyToOne((type) => Purchase)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;

  @ManyToOne((type) => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
