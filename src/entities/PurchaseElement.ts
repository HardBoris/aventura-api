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
  itemId?: string;

  @Column({ type: "float" })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: "float" })
  cost: number;

  @ManyToOne(() => Tool, (tool) => tool.details)
  @JoinColumn({ name: "toolId" })
  tool: Tool;

  /* @ManyToOne(() => Stuff, (stuff) => stuff.details)
  @JoinColumn({ name: "stuffId" })
  stuff: Stuff; */

  /* @ManyToOne(() => Midia, (midia) => midia.details)
  @JoinColumn({ name: "midiaId" })
  midia: Midia; */

  @ManyToOne(() => Purchase, (purchase) => purchase.details)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
