import { Injectable } from "@nestjs/common";
import { BalanceRepository } from "./balance.repository";
import { UUID } from 'crypto';

@Injectable()
export class BalanceService{
    constructor(private readonly balanceRepository: BalanceRepository)
    {}

    getBalanceById(id: UUID){
        return this.balanceRepository.getBalanceById(id);
    }
}