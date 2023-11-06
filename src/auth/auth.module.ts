import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/customer.entity';
import { CustomersService } from '../customers/customers.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { RefreshTokenStorage } from './refresh-token-storage';

@Module({
  imports: [
    CustomersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Customer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    CustomersService,
    LocalStrategy,
    JwtRefreshTokenStrategy,
    RefreshTokenStorage
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
