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
import { Company, Element, Midia, Purchase, Stuff, Tool } from "./index";

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
  element: Element[];

  /* @ManyToMany(() => Stuff, (stuff) => stuff.partners)
  @JoinTable()
  stuffs: Stuff[]; */

  /* @ManyToMany(() => Midia, (midia) => midia.partners)
  @JoinTable()
  midias: Midia[]; */

  /* @ManyToMany(() => Tool, (tool) => tool.partners)
  @JoinTable()
  tools: Tool[]; */
}
