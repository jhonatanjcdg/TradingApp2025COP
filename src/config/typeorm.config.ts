import { config as dotenvConfig } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { registerAs } from '@nestjs/config'

dotenvConfig({ path: '.env' })

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    ssl: {
        rejectUnauthorized: false, // Deshabilitar la validación de certificado (solo para desarrollo)
    },
}

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)
