import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateWalletDto {
    @IsNotEmpty({
        message: 'Provide the amount for the wallet'
    })
    @IsNumber()
    amount: number
}
