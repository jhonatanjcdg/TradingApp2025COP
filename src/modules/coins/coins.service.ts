import { Injectable } from "@nestjs/common";
import { CoinsRepository } from "./coins.repository";
import { Coin } from "./coins.entity";
import { CoinDto } from "./coins.dto";
import { UUID } from "crypto";

@Injectable()
export class CoinsService{
    constructor(
        private readonly coinsRepository: CoinsRepository
    )
    {}

    getCoins(){
        return this.coinsRepository.getCoins()
    }

    getCoinByName(name: string){
        return this.coinsRepository.getCoinByName(name)
    }

    createCoin(coin: CoinDto){
        return this.coinsRepository.createCoin(coin)
    }

    editCoin(coin: CoinDto, id: UUID){
        return this.coinsRepository.editCoin(coin, id)
    }

    deleteCoin(id: UUID){
        return this.coinsRepository.deleteCoin(id)
    }
}