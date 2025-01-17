import { CoinValueHistoricalModule } from './modules/coinValueHistorical/coinValueHistorical.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BalanceModule } from './modules/balance/balance.module';
import { CoinsModule } from './modules/coins/coins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    UsersModule,
    BalanceModule,
    CoinsModule,
    CoinValueHistoricalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
