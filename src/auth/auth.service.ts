import { Injectable, Logger, NotFoundException, UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenStorage } from './refresh-token-storage';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(
        private readonly customersService: CustomersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly refreshTokenStorage: RefreshTokenStorage
    ){}

    async signIn(signInDto: SignInDto) {
        const { username, password: passkey } = signInDto;

        const customer = await this.customersService.findByEmailOrPhone(username);

        if (!customer) {
            throw new NotFoundException('User not found')
        }

        console.log(customer)

        const validatePassword = await customer.validatePassword(passkey);

        if (!validatePassword) {
            throw new UnauthorizedException('Invalid password')
        }

        const { password, ...payload } = customer;

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d'
        })

        // store the refresh token in redis
        await this.refreshTokenStorage.insert(customer.id, refreshToken);

        return {
            ...payload,
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async validateCustomer(username: string, password: string): Promise<any> {
        const customer = await this.customersService.findByEmailOrPhone(username);

        if (customer && (await customer.validatePassword(password))) {
            const { password, ...rest } = customer;
            return rest;
        }

        return null
    }

    async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken);
            await this.refreshTokenStorage.validate(decoded.id, refreshToken);
            const { exp, iat, ...rest } = decoded;
            const accessToken = await this.jwtService.signAsync({ ...rest });
            return {
                access_token: accessToken
            }
        } catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async invalidateToken(accessToken: string): Promise<void> {
        try {
            const decoded = await this.jwtService.verifyAsync(accessToken);
            await this.refreshTokenStorage.invalidate(decoded?.id);
        } catch (error) {
            throw new UnauthorizedException("Invalid access token");
        }
    }
}
