import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { Customer } from './customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from  'bcrypt';
import { Wallet } from '../wallets/wallet.entity';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer | BadRequestException | InternalServerErrorException> {

    try {
      const { firstname, lastname, email, password, phonenumber } = createCustomerDto;

      if ((await this.findByEmailOrPhone(email))) {
        throw new BadRequestException('Email provided already exists')
      }
  
      if ((await this.findByEmailOrPhone(phonenumber))) {
        throw new BadRequestException('Phone number provided already exists')
      }
  
      const salt = await bcrypt.genSalt();
  
      let customer = new Customer();
  
      customer.firstname = firstname;
      customer.lastname = lastname;
      customer.email = email;
      customer.phonenumber = phonenumber;
      customer.password = await bcrypt.hash(password, salt)

      customer = await this.customerRepository.save(customer);

      // assign a new wallet to the newly created customer with 0 amount.
      const wallet = new Wallet();
      wallet.customer = customer;

      await this.walletRepository.save(wallet);

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async findOne(customer_id: string): Promise<Customer | NotFoundException | InternalServerErrorException> {
    try {

      const customer = await this.customerRepository.findOne({
        relations: ["wallet"],
        where: {
          id: customer_id
        }
      });
  
      if (!customer) {
        throw new NotFoundException(`Customer with ${customer_id} is not found`)
      }
  
      const { password, ...results } = customer;
      return results as Customer;
      
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Customer[] | InternalServerErrorException> {
    try {
      return await this.customerRepository.find({
        relations: ["wallet"]
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult | NotFoundException | InternalServerErrorException> {
    try {

      const customer = await this.findCustomerById(id);

      if (!customer) {
        throw new NotFoundException(`Customer with ${id} is not found`)
      }

      return await this.customerRepository.update(id, updateCustomerDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<DeleteResult | NotFoundException | InternalServerErrorException> {
    try {
      const customer = await this.findCustomerById(id);

      if (!customer) {
        throw new NotFoundException(`Customer with ${id} is not found`)
      }
      return await this.customerRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  findByEmailOrPhone(username: string) {
    return this.customerRepository.findOne({
      relations: ["wallet"],
      select: ["wallet"],
      where: [
        { email: username },
        { phonenumber: username }
      ]
    })
  }

  findCustomerById(id: string) {
    return this.customerRepository.findOne({
      relations: ["wallet"],
      select: ["wallet"],
      where: {
        id
      }
    })
  }
}
