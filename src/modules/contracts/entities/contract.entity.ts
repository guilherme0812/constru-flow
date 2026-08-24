import { ContractExecutionStatus } from "@/common/enums";
import { Application } from "@/modules/applications/entities/application.entity";
import { Demand } from "@/modules/demands/entities/demand.entity";
import { Evaluation } from "@/modules/evaluations/entities/evaluation.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";

@Entity("contracts")
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "demand_id" })
  demandId: string;

  @ManyToOne(() => Demand)
  @JoinColumn({ name: "demand_id" })
  demand: Demand;

  @Column({ name: "winning_application_id" })
  winningApplicationId: string;

  @OneToOne(() => Application)
  @JoinColumn({ name: "winning_application_id" })
  winningApplication: Application;

  @Column({ name: "final_amount", type: "decimal", precision: 14, scale: 2 })
  finalAmount: number;

  @Column({ name: "signed_at", type: "date", nullable: true })
  signedAt: Date | null;

  @Column({
    name: "execution_status",
    type: "enum",
    enum: ContractExecutionStatus,
    default: ContractExecutionStatus.NOT_STARTED,
  })
  executionStatus: ContractExecutionStatus;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.contract)
  evaluations: Evaluation[];
}
