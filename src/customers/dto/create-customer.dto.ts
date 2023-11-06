import { isString, isEmail, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
    @IsString({
        message: "customer firstname should be a string"
    })
    @IsNotEmpty({
        message: 'customer firstname should not be empty'
    })
    firstname: string;

    @IsString({
        message: "customer lastname should be a string"
    })
    @IsNotEmpty({
        message: 'customer lastname should not be empty'
    })
    lastname: string;

    @IsString({
        message: "customer email should be a string"
    })
    @IsNotEmpty({
        message: 'customer email should not be empty'
    })
    @IsEmail()
    email: string;

    @IsString({
        message: "customer phone number should be a string"
    })
    @IsNotEmpty({
        message: 'customer phone number should not be empty'
    })
    phonenumber: string;

    @IsString({
        message: "customer password should be a string"
    })
    @IsNotEmpty({
        message: 'customer password should not be empty'
    })
    password: string;
}
