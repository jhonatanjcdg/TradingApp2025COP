import { Injectable } from "@nestjs/common";
import { CoinsRepository } from "./coins.repository";
import { Coin } from "./coins.entity";

@Injectable()
export class CoinsService{
    constructor(
        private readonly coinsRepository: CoinsRepository
    )
    {}

    getCoins(){
        return this.coinsRepository.getCoins()
    }
}