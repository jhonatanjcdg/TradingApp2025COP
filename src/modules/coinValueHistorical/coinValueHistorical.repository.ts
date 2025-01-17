import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoinValueHistorical } from "./coinValueHistorical.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoinValueHistoricalRepository{
    constructor(
        @InjectRepository(CoinValueHistorical) private coinValueHistoricalRepository: Repository<CoinValueHistorical>,
    ){}

    async getAllCoinsValue(){
        try {
            const coinsValue = await this.coinValueHistoricalRepository.find()
            if(!coinsValue){
                throw new HttpException(
                    'Coins Value Historical is empty',
                    HttpStatus.NOT_FOUND
                )
            }
            return coinsValue
        } catch (error) {
            if(error instanceof NotFoundException){
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            }
            throw new HttpException(
                'Error obtaining coins value historical',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getCoinValue(id: string){
        try {
            const coinValue = await this.coinValueHistoricalRepository.findOne({
                where: {id}
            })
            if(!coinValue){
                throw new HttpException(
                    `Coin Value historical with id: ${id} not found`,
                    HttpStatus.NOT_FOUND
                )
            }
            return coinValue
        } catch (error) {
            if(error instanceof NotFoundException){
                throw new HttpException(
                    error.message, HttpStatus.NOT_FOUND
                )
            }
            throw new HttpException(
                'Error obtaining coin value historical',
                HttpStatus.BAD_REQUEST
            )
        }
    }
}