import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Entity } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'numeric', default: 0.00 })
    amount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @Column({ type: 'varchar', default: 'active' })
    status: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date

    @OneToOne(() => Customer, customer => customer.wallet, { onDelete: 'CASCADE' })
    customer: Customer;

}
