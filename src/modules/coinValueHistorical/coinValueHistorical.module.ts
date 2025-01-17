import { CoinValueHistorical } from './coinValueHistorical.entity';
import { Module } from "@nestjs/common";
import { CoinValueHistoricalController } from "./coinValueHistorical.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoinValueHistoricalService } from './coinValueHistorical.service';
import { CoinValueHistoricalRepository } from './coinValueHistorical.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CoinValueHistorical])],
    providers: [
        CoinValueHistoricalService,
        CoinValueHistoricalRepository,
    ],
    controllers: [CoinValueHistoricalController]
})
export class CoinValueHistoricalModule{
    
}