import { Coin } from './coins.entity';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { CoinDto } from './coins.dto';
import { UUID } from 'crypto';

@Injectable()
export class CoinsRepository{
    constructor(
        @InjectRepository(Coin) private coinsRepository: Repository<Coin>,
        @InjectDataSource() private dataSource: DataSource,
    ){}

    async getCoins(){
        const coins = this.coinsRepository.find()
        try{
            if(!coins){
                throw new HttpException(
                    'Error gettin coins',
                    HttpStatus.NOT_FOUND
                )
            }
            return coins
        }
        catch(error){
            if(error instanceof NotFoundError){
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            }
            throw new HttpException(
                'Error gettin coins',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getCoinByName(name: string){
        const coin = this.coinsRepository.findOne({where: {name}})
        try{
            if(!coin){
                throw new HttpException('Coin not found', HttpStatus.NOT_FOUND)
            }
            return coin
        }
        catch(error){
            if(error instanceof NotFoundException){
                return new HttpException(error.message, HttpStatus.NOT_FOUND)
            }
            throw new HttpException(
                'Error getting coin name',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async createCoin(coin: CoinDto){
        return await this.dataSource.transaction(async (manager) => {
            const coin = await this.getCoinByName(CoinDto.name)
            try{
                if(coin){
                    throw new HttpException(
                        `Coin with name: ${coin.name} already exists`,
                        HttpStatus.BAD_REQUEST
                    )
                }
                const newCoin = this.coinsRepository.create(coin)
                return await manager.save(newCoin)
            }
            catch(error){
                if(error instanceof BadRequestException){
                    throw new HttpException(
                        error.message, HttpStatus.BAD_REQUEST
                    )
                }
                throw new HttpException(
                    'Internal servel error',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }
        })
    }

    async editCoin(coinEdit: CoinDto, id: UUID){
        return await this.dataSource.transaction(async (manager) => {
            const coin = await this.coinsRepository.findOne({where: {id}})
            try {
                if(!coin){
                    throw new HttpException(
                        "Coin doesn't exists",
                        HttpStatus.NOT_FOUND
                    )
                }
                // Modificar al coin
                for(const key in coinEdit){
                    if(coin[key] !== coinEdit){
                        coin[key] = coinEdit[key]
                    }
                }
                this.coinsRepository.merge(coin, coinEdit)
                await this.coinsRepository.save(coin)
            } catch (error) {
                if(error instanceof NotFoundException){
                    throw new HttpException(error.message, HttpStatus.NOT_FOUND)
                }
                throw new HttpException('Error updating coin', HttpStatus.BAD_REQUEST)
            }
        })
    }

    async deleteCoin(id: UUID){
        try {
            const result = await this.coinsRepository.delete(id)
            if(result.affected === 0){
                throw new HttpException(
                    `Coin with id: ${id} not exists`,
                    HttpStatus.NOT_FOUND
                )
            }
            return `Coin with id: ${id} deleted`
        } catch (error) {
            if(error instanceof NotFoundException){
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            }
            throw new HttpException(
                'Error deleting coin',
                HttpStatus.BAD_REQUEST
            )
        }    
    }
}