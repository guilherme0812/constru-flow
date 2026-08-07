import { ProviderType } from '@/common/enums';
import { Application } from '@/modules/applications/entities/application.entity';
import { Category } from '@/modules/categories/entities/category.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('providers')
export class Provider {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.provider, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'legal_name' })
  legalName: string;

  @Column({ name: 'tax_id', unique: true })
  taxId: string;

  @Column({ name: 'provider_type', type: 'enum', enum: ProviderType })
  providerType: ProviderType;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'provider_specialties',
    joinColumn: { name: 'provider_id', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  specialties: Category[];

  @Column({ name: 'operating_regions', type: 'simple-array', nullable: true })
  operatingRegions: string[];

  @Column({ name: 'team_capacity', type: 'int', nullable: true })
  teamCapacity: number;

  @Column({ name: 'average_rating', type: 'float', default: 0 })
  averageRating: number;

  @Column({ type: 'simple-array', nullable: true })
  portfolio: string[];

  @Column({ name: 'is_document_verified', default: false })
  isDocumentVerified: boolean;

  @OneToMany(() => Application, (application) => application.provider)
  applications: Application[];
}
