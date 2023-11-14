import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'numeric', default: 0.00 })
    amount: number;

    @Column({ type: 'varchar' })
    from: string;
    
    @Column({ type: 'varchar' })
    to: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date

}
