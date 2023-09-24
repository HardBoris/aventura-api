import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { PurchaseRequest } from "./PurchaseRequest";
import { Element } from "./Element";

@Entity("purchase_elements")
export class PurchaseElement {
  @PrimaryGeneratedColumn("uuid")
  itemId?: string;

  @Column({ type: "float" })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: "float" })
  cost?: number;

  @ManyToOne(() => PurchaseRequest, (prequest) => prequest.details)
  @JoinColumn({ name: "prequestId" })
  prequest: PurchaseRequest;

  @ManyToOne(() => Element, (element) => element.details)
  @JoinColumn({ name: "elementId" })
  element: Element;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
