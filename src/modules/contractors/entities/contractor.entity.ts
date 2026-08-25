import { CompanySize } from "@/common/enums";
import { Demand } from "@/modules/demands/entities/demand.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("contractors")
export class Contractor {
  @PrimaryColumn("uuid", { name: "user_id" })
  userId: string;

  @OneToOne(() => User, (user) => user.contractor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "legal_name" })
  legalName: string;

  @Column({ name: "tax_id", unique: true })
  taxId: string;

  @Column({
    name: "company_size",
    type: "enum",
    enum: CompanySize,
    nullable: true,
  })
  companySize: CompanySize;

  @Column({ name: "operating_regions", type: "simple-array", nullable: true })
  operatingRegions: string[];

  @Column({ name: "average_rating", type: "float", default: 0 })
  averageRating: number;

  @Column({ name: "is_document_verified", default: false })
  isDocumentVerified: boolean;

  @OneToMany(() => Demand, (demand) => demand.contractor)
  demands: Demand[];
}
