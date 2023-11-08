import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WalletsService {

  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>
  ){}

  async findAll() {
    try {
      const AllWallets = await this.walletRepository.find();
      return AllWallets;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const wallet = await this.findWalletById(id);

      if (!wallet) {
        throw new NotFoundException(`Wallet with ID ${id} is not found`);
      }
      return wallet;
    } catch (error) {
      console.log(error)
      throw error;
    }
    
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    try {
      const wallet = await this.findWalletById(id);
      if (!wallet) {
        throw new NotFoundException(`Wallet with ID ${id} is not found`);
      }
      return await this.walletRepository.update(id, updateWalletDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const wallet = await this.findWalletById(id);
      if (!wallet) {
        throw new NotFoundException(`Wallet with ID ${id} is not found`);
      }
      return await this.walletRepository.delete(id);
    } catch (error) {
      throw error;
    }

  }

  findWalletById(wallet_id: string) {
    return this.walletRepository.findOne({
      where: {
        id: wallet_id
      }
    })
  }
}
