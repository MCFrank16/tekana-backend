import { Controller, Get, Post, Body, Param, UseGuards, Req, NotFoundException, BadRequestException } from '@nestjs/common';
import { Request } from 'express'
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WalletsService } from '../wallets/wallets.service';
import { Customer } from 'src/customers/customer.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly walletService: WalletsService,
    private readonly transactionsService: TransactionsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Req() req: Request, @Body() createTransactionDto: CreateTransactionDto) {

    try {
      const { amount, to, from } = req.body;

      // receiver wallet
      const receiverWallet = await this.walletService.findWalletById(to);

      // sender wallet
      const senderWallet = await this.walletService.findWalletById(from);

      if (!senderWallet) {
        throw new NotFoundException(`Sender wallet with ${from} is not found`);
      }

      if (!receiverWallet) {
        throw new NotFoundException(`Receiver wallet with ${to} is not found`);
      }

      if (amount > senderWallet?.amount) {
        throw new BadRequestException(`Insufficient fund.`);
      }

      // update sender wallet by removing the amount
      await this.walletService.updateWalletAmount(senderWallet?.id, senderWallet?.amount - amount);

      // update receiver wallet by adding the amount;
      await this.walletService.updateWalletAmount(receiverWallet?.id, +receiverWallet?.amount + amount);

      return this.transactionsService.create(createTransactionDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  findAll(@Req() req: Request) {
    const customer: Customer = req?.user as Customer;
    return this.transactionsService.findAll(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
}
