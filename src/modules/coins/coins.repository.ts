import { Coin } from './coins.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class CoinsRepository{
    constructor(
        @InjectRepository(Coin) private coinsRepository: Repository<Coin>
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
}