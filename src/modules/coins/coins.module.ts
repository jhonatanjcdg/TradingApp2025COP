import { Module } from "@nestjs/common";
import { CoinsController } from "./coins.controller";
import { CoinsService } from "./coins.service";
import { CoinsRepository } from "./coins.repository";

@Module({
    imports: [],
    controllers: [CoinsController],
    providers: [CoinsService, CoinsRepository],
})
export class CoinsModule{
}