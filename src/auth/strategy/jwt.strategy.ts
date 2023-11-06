import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { CustomersService } from 'src/customers/customers.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(private readonly customersService: CustomersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });

        this.logger.warn('JwtStrategy initialized');
    }

    async validate(payload: JwtPayload): Promise<any> {
        this.logger.warn(`Payload: ${JSON.stringify(payload)}`);

        const customer = await this.customersService.findOne(payload?.id);

        if (!customer) {
            this.logger.error('Customer not found');
            throw new UnauthorizedException();
        }

        return customer;
    }
}
