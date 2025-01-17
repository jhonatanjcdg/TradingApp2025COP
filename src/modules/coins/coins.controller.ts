import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CoinsService } from "./coins.service";
import { CoinDto } from "./coins.dto";
import { UUID } from "crypto";

@Controller('coins')
export class CoinsController{
    constructor(
        private readonly coinsService: CoinsService
    )
    {}

    @Get()
    getCoins(){
        return this.coinsService.getCoins()
    }

    @Get('name')
    getCoinByName(@Param('name') name: string){
        return this.coinsService.getCoinByName(name)
    }

    @Post('create')
    createCoin(@Body() coin: CoinDto){
        return this.coinsService.createCoin(coin)
    }

    @Put('edit')
    editCoin(@Body() coin: CoinDto, @Param('id', ParseUUIDPipe) id: UUID){
        return this.coinsService.editCoin(coin, id)
    }

    @Delete('delete/:id')
    deleteCoin(@Param('id', ParseUUIDPipe) id: UUID){
        return this.coinsService.deleteCoin(id)
    }
}