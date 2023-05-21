import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./index";

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  supplierId?: string;

  @Column()
  supplierName: string;

  @Column({ unique: true })
  supplierCNPJ: string;

  @Column({ nullable: true })
  supplierCorporateName?: string;

  @Column({ nullable: true })
  supplierEmail?: string;

  @Column({ nullable: true })
  supplierPhone?: string;

  @ManyToOne(() => Company, (company) => company.suppliers)
  @JoinColumn({ name: "companyId" })
  company: Company;
}
