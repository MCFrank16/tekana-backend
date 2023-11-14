import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { configuration } from 'config';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptors } from './interceptors/response.interceptor';

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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptors
    }
  ],
})
export class AppModule {}
