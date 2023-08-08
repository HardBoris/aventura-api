import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";

@Entity("service_orders")
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  serviceOrderId?: number;

  @Column()
  order: string;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
