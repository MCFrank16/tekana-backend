import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CustomersService } from "src/customers/customers.service";
import { JwtPayload } from "../jwt-payload.interface";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly customersService: CustomersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });

        this.logger.warn('JwtRefreshTokenStrategy initialized');
    }

    async validate(payload: JwtPayload): Promise<any> {
        this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
        
        const customer = await this.customersService.findOne(payload.id);
        
        if (!customer) {
            this.logger.error('Customer not found');
            throw new UnauthorizedException();
        }
        return customer;
    }
}
