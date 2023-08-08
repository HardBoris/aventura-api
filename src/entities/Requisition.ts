import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movement } from "./Movement";
import { Company } from "./Company";
import { User } from "./User";
import { ServiceOrder } from "./ServiceOrder";

@Entity("requisitions")
export class Requisition {
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column({ default: false })
  isDelivered: boolean;

  @Column()
  requestDate: Date;

  @OneToOne(() => ServiceOrder)
  @JoinColumn({ name: "orderId" })
  service: ServiceOrder;

  @ManyToOne(() => User, (user) => user.requisitions)
  @JoinColumn({ name: "userId" })
  requestor: User;

  @OneToMany(() => Movement, (movement) => movement.requisition, {
    cascade: true,
  })
  movements: Movement[];

  @ManyToOne(() => Company, (company) => company.code)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}
