import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { Stuff } from "./Stuff";
import { Midia } from "./Midia";
import { Tool } from "./Tool";
import { Purchase } from "./Purchase";

@Entity("purchase_elements")
export class PurchaseElement {
  @PrimaryGeneratedColumn("uuid")
  elementId?: string;

  @Column()
  element: string;

  @Column({ type: "float" })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: "float" })
  cost: number;

  @ManyToOne((type) => Midia)
  @JoinColumn({ name: "midiaId" })
  midia: Midia;

  @ManyToOne((type) => Stuff)
  @JoinColumn({ name: "stuffId" })
  stuff: Stuff;

  @ManyToOne((type) => Tool)
  @JoinColumn({ name: "toolId" })
  tool: Tool;

  @ManyToOne((type) => Purchase)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
