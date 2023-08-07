import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Requisition } from "./Requisition";
import { Entry } from "./Entry";
import { Company } from "./Company";

@Entity("movements")
export class Movement {
  @PrimaryGeneratedColumn()
  moveId: number;

  @Column()
  moveType: string;

  @Column()
  moveElement: string;

  @Column()
  elementType: string;

  @Column()
  moveQuantity: number;

  @Column()
  moveUnit: string;

  @ManyToOne(() => Requisition, (requisition) => requisition.movements)
  @JoinColumn({ name: "requisitionId" })
  requisition: Requisition;

  @ManyToOne(() => Entry, (entry) => entry.movements)
  @JoinColumn({ name: "entryId" })
  entry: Entry;

  @ManyToOne(() => Company, (company) => company.code)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
