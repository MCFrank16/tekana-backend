import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ){}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.save(createTransactionDto);
  }

  findAll(customer: Customer) {
    const wallet_id = customer?.wallet?.id;
    return this.transactionRepository.find({
      where: [
        { from: wallet_id },
        { to: wallet_id }
      ]
    })
  }

  async findOne(transaction_id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transaction_id
      }
    })

    if (!transaction) {
      throw new NotFoundException(`The transaction with the id of ${transaction_id} is not found.`);
    }

    return transaction
  }
}
