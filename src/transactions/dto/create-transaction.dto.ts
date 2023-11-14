import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateTransactionDto {

    @IsNotEmpty({ message: 'Provide the wallet to send money to'})
    @IsString({ message: 'Receiver wallet should be a string' })
    to: string;

    @IsNotEmpty({ message: 'Provide the wallet to get money from'})
    @IsString({ message: 'Sender wallet id should be a string' })
    from: string;

    @IsNotEmpty({ message: 'Provide the amount for the transaction'})
    @IsNumber()
    amount: number;

}
