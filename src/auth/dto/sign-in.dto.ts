import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsString({
        message: 'username should be a string'
    })
    @IsNotEmpty({
        message: 'Provide your username'
    })
    username: string;

    @IsString({
        message: 'password should be a string'
    })
    @IsNotEmpty({
        message: 'Provide your password'
    })
    password: string;
}
