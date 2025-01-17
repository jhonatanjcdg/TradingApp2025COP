import { Injectable } from "@nestjs/common";
import { CoinValueHistoricalRepository } from "./coinValueHistorical.repository";

@Injectable()
export class CoinValueHistoricalService{
    constructor(
        private readonly coinValueHistoricalRepository: CoinValueHistoricalRepository
    ){}

    getAllCoinsValue(){
        return this.coinValueHistoricalRepository.getAllCoinsValue()
    }

    getCoinValue(id: string){
        return this.coinValueHistoricalRepository.getCoinValue(id)
    }
}