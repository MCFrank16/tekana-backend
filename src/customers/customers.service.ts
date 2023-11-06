import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { Customer } from './customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from  'bcrypt';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
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
  
      const customer = new Customer();
  
      customer.firstname = firstname;
      customer.lastname = lastname;
      customer.email = email;
      customer.phonenumber = phonenumber;
      customer.password = await bcrypt.hash(password, salt)
  
      return this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }



  async findOne(customer_id: string): Promise<Customer | NotFoundException | InternalServerErrorException> {
    try {

      const customer = await this.customerRepository.findOne({
        where: {
          id: customer_id
        }
      });
  
      if (!customer) {
        throw new NotFoundException('Customer not found')
      }
  
      const { password, ...results } = customer;
      return results as Customer;
      
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Customer[] | InternalServerErrorException> {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult | NotFoundException | InternalServerErrorException> {
    try {

      const customer = await this.findCustomerById(id);

      if (!customer) {
        throw new NotFoundException("Customer not found");
      }

      return await this.customerRepository.update(id, updateCustomerDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<DeleteResult | NotFoundException | InternalServerErrorException> {
    try {
      const customer = await this.findCustomerById(id);

      if (!customer) {
        throw new NotFoundException("Customer not found");
      }
      return await this.customerRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findByEmailOrPhone(username: string) {
    return this.customerRepository.findOne({
      where: [
        { email: username },
        { phonenumber: username }
      ]
    })
  }

  findCustomerById(id: string) {
    return this.customerRepository.findOne({
      where: {
        id
      }
    })
  }
}
