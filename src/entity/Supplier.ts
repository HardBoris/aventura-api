import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  supplierId?: string;

  @Column({ unique: true })
  supplierName: string;

  @Column()
  supplierCNPJ: string;

  @Column()
  supplierCorporateName: string;

  @Column()
  supplierEmail: string;

  @Column()
  supplierPhone: string;

  @ManyToOne(() => Company, (company) => company.suppliers)
  @JoinColumn({ name: "companyId" })
  company: Company;
}
