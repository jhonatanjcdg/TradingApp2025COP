import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { CoinValueHistoricalService } from "./coinValueHistorical.service";

@Controller('coinValue')
export class CoinValueHistoricalController{
    constructor(
        private readonly coinValueHistoricalService: CoinValueHistoricalService
    ){}

    @Get()
    getAllCoinsValue(){
        return this.coinValueHistoricalService.getAllCoinsValue()
    }

    @Get(':id')
    getCoinValue(@Param('id', ParseUUIDPipe) id: string){
        return this.coinValueHistoricalService.getCoinValue(id)
    }
}