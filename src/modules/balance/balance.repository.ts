/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Balance } from './balance.entity';
import { DataSource, Repository } from 'typeorm';
import { UUID } from 'crypto';


@Injectable()
export class BalanceRepository {
  constructor(
    @InjectRepository(Balance) private balanceRepository: Repository<Balance>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  

    async getBalanceById(id: UUID): Promise<string>{
      try{
        return "its's works!"
      }
      catch(error){
        throw new Error(`Error getting balance: ${error.message}`);
      }
    }
}
