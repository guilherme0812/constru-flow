import { DemandStatus } from "@/common/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contractor } from "@/modules/contractors/entities/contractor.entity";
import { Category } from "@/modules/categories/entities/category.entity";
import { Application } from "@/modules/applications/entities/application.entity";

@Entity("demands")
export class Demand {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "contractor_id" })
  contractorId: string;

  @ManyToOne(() => Contractor, (contractor) => contractor.demands)
  @JoinColumn({ name: "contractor_id" })
  contractor: Contractor;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ name: "category_id" })
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column({ name: "worksite_location" })
  worksiteLocation: string;

  @Column({ name: "location_lat", type: "float", nullable: true })
  locationLat: number | null;

  @Column({ name: "location_lng", type: "float", nullable: true })
  locationLng: number | null;

  @Column({ name: "estimated_start_date", type: "date" })
  estimatedStartDate: Date;

  @Column({ name: "execution_period_days", type: "int" })
  executionPeriodDays: number;

  @Column({ name: "budget_range", nullable: true })
  budgetRange: string;

  @Column({ name: "required_documents", type: "simple-array", nullable: true })
  requiredDocuments: string[];

  @Column({ name: "application_deadline", type: "timestamptz" })
  applicationDeadline: Date;

  @Column({ type: "enum", enum: DemandStatus, default: DemandStatus.DRAFT })
  status: DemandStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Application, (application) => application.demand)
  applications: Application[];
}
