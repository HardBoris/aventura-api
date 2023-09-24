import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { Element } from "./Element";

@Entity("tools")
export class Tool {
  @PrimaryGeneratedColumn("uuid")
  toolProfileId?: string;

  @Column({ nullable: true })
  toolModel?: string;

  @Column({ nullable: true })
  toolPower?: string;

  @OneToOne(() => Element, (element) => element.tool)
  element: Element;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
