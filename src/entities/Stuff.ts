import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "./Purchase";
import { Supplier } from "./Supplier";
import { Company } from "./Company";

@Entity("stuffs")
export class Stuff {
  @PrimaryGeneratedColumn("uuid")
  stuffId?: string;

  @Column()
  stuffName: string;

  @Column({ nullable: true })
  stuffDescription?: string;

  @Column({ nullable: true })
  stuffPacking?: string;

  @Column({ nullable: true })
  stuffPerPacking?: string;

  @Column()
  measurementUnit: string;

  @Column({ nullable: true })
  minimumStock?: string;

  @Column({ nullable: true })
  idealStock?: string;

  @ManyToOne((type) => Supplier)
  @JoinColumn({ name: "supplierId" })
  supplier: Supplier;

  @ManyToOne((type) => Purchase)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
