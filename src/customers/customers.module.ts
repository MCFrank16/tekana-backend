import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Wallet } from '../wallets/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Wallet])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
