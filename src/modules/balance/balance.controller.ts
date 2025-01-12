/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService
  )
  {}

  @Get()
  getBalances(id : UUID) {
    return this.balanceService.getBalanceById(id)
  }
}
