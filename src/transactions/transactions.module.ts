import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from '../customers/customers.service';
import { WalletsService } from '../wallets/wallets.service';
import { Customer } from '../customers/customer.entity';
import { Wallet } from '../wallets/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Customer, Wallet])],
  controllers: [TransactionsController],
  providers: [TransactionsService, CustomersService, WalletsService],
})
export class TransactionsModule {}
