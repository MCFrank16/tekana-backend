import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { JwtRefreshTokenStrategy } from "./jwt-refresh-token.strategy";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(private authService: AuthService) {
        super({ usernameField: 'username' });
        this.logger.warn('LocalStrategy initialized');
    }

    async validate(username: string, password: string): Promise<any> {
        const customer = await this.authService.validateCustomer(username, password);

        if (!customer) {
            throw new UnauthorizedException("Invalid username or password");
        }
        return customer;
    }
}
