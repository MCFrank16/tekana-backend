import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
    refresh_token: string;
}