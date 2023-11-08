import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { configuration } from 'config';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { WalletsModule } from './wallets/wallets.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    DatabaseModule,
    CustomersModule,
    AuthModule,
    WalletsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
