import { Body, Controller, Get, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly customersService: CustomersService
    ){}

    @Post('register')
    async signUp(@Body() createCustomerDto:CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Body() signInDto:SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Get('refresh-token')
    async refreshToken(@Headers('authorization') authorization: string) {
        const refresh_token = authorization.split(' ')[1];
        return this.authService.refreshAccessToken(refresh_token);
    }

    @UseGuards(JwtAuthGuard)
    @Post('invalidate-token')
    async invalidateToken(@Headers('authorization') authorization: string) {
        const token = authorization.split(' ')[1];
        await this.authService.invalidateToken(token);
        return { message: 'Token invalidated successfully' }
    }
}
