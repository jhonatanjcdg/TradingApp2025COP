import { config as dotenvConfig } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { registerAs } from '@nestjs/config'

dotenvConfig({ path: '.env' })

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    // dropSchema: true,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}']
}

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)