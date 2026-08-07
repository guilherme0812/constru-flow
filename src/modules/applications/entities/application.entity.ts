import { ApplicationStatus } from '@/common/enums';
import { Demand } from '@/modules/demands/entities/demand.entity';
import { Message } from '@/modules/messages/entities/message.entity';
import { Provider } from '@/modules/providers/entities/provider.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
    CreateDateColumn,
    OneToMany
} from 'typeorm';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'demand_id' })
    demandId: string;

    @ManyToOne(() => Demand, (demand) => demand.applications)
    @JoinColumn({ name: 'demand_id' })
    demand: Demand;

    @Column({ name: 'provider_id' })
    providerId: string;

    @ManyToOne(() => Provider, (provider) => provider.applications)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column({ name: 'proposed_amount', type: 'decimal', precision: 14, scale: 2 })
    proposedAmount: number;

    @Column({ name: 'proposed_duration_days', type: 'int' })
    proposedDurationDays: number;

    @Column({ type: 'text', nullable: true })
    termsAndConditions: string;

    @ManyToMany(() => Document)
    @JoinTable({
        name: 'application_documents',
        joinColumn: { name: 'application_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'document_id', referencedColumnName: 'id' },
    })
    attachedDocuments: Document[];

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.SENT,
    })
    status: ApplicationStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Message, (message) => message.application)
    messages: Message[];
}