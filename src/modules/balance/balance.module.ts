import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balance.entity';
import { BalanceRepository } from './balance.repository';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  providers: [BalanceRepository, BalanceService],
  controllers: [BalanceController],
})
export class UsersModule {}
