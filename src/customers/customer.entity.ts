import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Wallet } from './../wallets/wallet.entity';
@Entity()
export class Customer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Index("email")
    @Column({ unique: true, type: 'varchar', nullable: false })
    email: string;

    @Index("phonenumber")
    @Column({ unique: true, type: 'varchar', nullable: false })
    phonenumber: string;

    @Column()
    password: string;

    @Column({ type: 'varchar', default: 'active' })
    status: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date

    @OneToOne(() => Wallet, { onDelete: 'CASCADE' })
    @JoinColumn()
    wallet: Wallet

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
