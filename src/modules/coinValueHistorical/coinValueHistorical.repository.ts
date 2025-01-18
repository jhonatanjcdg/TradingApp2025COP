import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoinValueHistorical } from "./coinValueHistorical.entity";
import { Repository } from "typeorm";
import { coinValueHistoricalDto } from "./coinValueHistorical.dto";

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

    async createCoinValueHistorical(body: coinValueHistoricalDto){
        try {
            const newCoinValue = this.coinValueHistoricalRepository.create(body)
            await this.coinValueHistoricalRepository.save(newCoinValue)
            return {
                message: 'Coin Value Historical created successfully',
                newCoinValue
            }
        } catch (error) {
            if(error instanceof BadRequestException){
                throw new HttpException(
                    error.message,
                    HttpStatus.BAD_REQUEST
                )
            }
            throw new HttpException(
                'Error creating coin value historical',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async updateCoinValueHistorical(body: coinValueHistoricalDto, id: string){
        try {
            const updatedCoinValue = await this.coinValueHistoricalRepository.findOne({
                where: {id}
            })
            if(!updatedCoinValue){
                throw new HttpException(
                    `Coin value historical with id: ${id} not found`,
                    HttpStatus.NOT_FOUND
                )
            }
            for(const key in body){
                if(updatedCoinValue[key] !== body[key]){
                    updatedCoinValue[key] = body[key]
                }
            }
            this.coinValueHistoricalRepository.merge(updatedCoinValue, body)
            await this.coinValueHistoricalRepository.save(updatedCoinValue)
            return updatedCoinValue
        } catch (error) {
            if(error instanceof NotFoundException){
                throw new HttpException(
                    error.message,
                    HttpStatus.NOT_FOUND
                )
            }
            throw new HttpException(
                'Error updating coin value historical',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async deleteCoinValueHistorical(id: string){
        try {
            const result = await this.coinValueHistoricalRepository.delete(id)
            if(result.affected === 0){
                throw new HttpException(
                    `coin value historical with id: ${id} not found`,
                    HttpStatus.NOT_FOUND
                )
            }
            return `Coin value historical with id: ${id} has been deleted`
        } catch (error) {
            if(error instanceof NotFoundException){
                throw new HttpException(
                    error.message, HttpStatus.NOT_FOUND
                )
            }
            throw new HttpException(
                'Error deleting coin value historical',
                HttpStatus.BAD_REQUEST
            )
        }
    }
}