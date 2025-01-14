import { Controller, Get } from "@nestjs/common";
import { CoinsService } from "./coins.service";

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
}