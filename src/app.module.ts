import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { configuration } from 'config';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    DatabaseModule,
    CustomersModule,
    AuthModule,
    WalletsModule,
    TransactionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
