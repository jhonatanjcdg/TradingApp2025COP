import { Injectable } from "@nestjs/common";
import { CoinValueHistoricalRepository } from "./coinValueHistorical.repository";
import { coinValueHistoricalDto } from "./coinValueHistorical.dto";

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

    createCoinValueHistorical(body: coinValueHistoricalDto){
        return this.coinValueHistoricalRepository.createCoinValueHistorical(body)
    }

    updateCoinValueHistorical(body: coinValueHistoricalDto, id: string){
        return this.coinValueHistoricalRepository.updateCoinValueHistorical(body, id)
    }

    deleteCoinValueHistorical(id: string){
        return this.coinValueHistoricalRepository.deleteCoinValueHistorical(id)
    }
}