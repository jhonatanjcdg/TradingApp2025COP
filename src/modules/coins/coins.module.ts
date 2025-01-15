import { Module } from "@nestjs/common";
import { CoinsController } from "./coins.controller";
import { CoinsService } from "./coins.service";
import { CoinsRepository } from "./coins.repository";
import { Coin } from "./coins.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Coin])],
    providers: [CoinsService, CoinsRepository],
    controllers: [CoinsController],
})
export class CoinsModule{
}