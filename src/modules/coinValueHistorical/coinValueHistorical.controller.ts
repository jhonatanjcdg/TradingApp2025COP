import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CoinValueHistoricalService } from "./coinValueHistorical.service";
import { coinValueHistoricalDto } from "./coinValueHistorical.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('CoinValueHistorical')
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

    @Post('create-coinValue')
    createCoinValueHistorical(@Body() body: coinValueHistoricalDto){
        return this.coinValueHistoricalService.createCoinValueHistorical(body)
    }

    @Put('update')
    updateCoinValueHistorical(@Body() body: coinValueHistoricalDto, @Param('id', ParseUUIDPipe) id: string){
        return this.coinValueHistoricalService.updateCoinValueHistorical(body, id)
    }

    @Delete('delete')
    deleteCoinValueHistorical(@Param('id', ParseUUIDPipe) id: string){
        return this.coinValueHistoricalService.deleteCoinValueHistorical(id)
    }
}