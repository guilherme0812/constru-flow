import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Application } from '../../applications/entities/application.entity';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'application_id' })
    applicationId: string;

    @ManyToOne(() => Application, (application) => application.messages)
    @JoinColumn({ name: 'application_id' })
    application: Application;

    @Column({ name: 'sender_id' })
    senderId: string;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}