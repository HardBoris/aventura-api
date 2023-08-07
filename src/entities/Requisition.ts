import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movement } from "./Movement";
import { Company } from "./Company";

@Entity("requisitions")
export class Requisition {
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column({ default: false })
  isDelivered: boolean;

  @Column()
  requestDate: Date;

  @Column()
  requestor: string;

  @Column()
  requestTarget: string;

  @OneToMany(() => Movement, (movement) => movement.requisition, {
    cascade: true,
    // eager: true,
  })
  movements: Movement[];

  @ManyToOne(() => Company, (company) => company.code)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
