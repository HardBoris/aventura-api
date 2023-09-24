import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company, Element, Purchase } from "./index";

@Entity("partners")
export class Partner {
  @PrimaryGeneratedColumn("uuid")
  partnerId?: string;

  @Column()
  fantasyName: string;

  @Column()
  CNPJ: string;

  @Column({ nullable: true })
  corporateName?: string;

  @Column({ nullable: true })
  partnerEmail?: string;

  @Column({ nullable: true })
  partnerPhone?: string;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  @OneToMany(() => Purchase, (purchase) => purchase.partner)
  purchases: Purchase[];

  @ManyToMany(() => Element, (element) => element.partners)
  @JoinTable()
  elements: Element[];
}
