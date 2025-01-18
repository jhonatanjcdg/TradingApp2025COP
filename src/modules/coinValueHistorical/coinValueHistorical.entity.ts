import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'coinValuesHistorical'
})
export class CoinValueHistorical{
    @ApiProperty({
        description: 'uuid, se genera automáticamente',
        type: 'string',
        example: '8eab36aa-398d-4a25-8dc0-63be3c5c633f'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty({
        description: 'Valor actual de la moneda, según la fecha',
        type: 'number',
        example: 10
    })
    @Column({
        type: 'numeric',
        default: 10
    })
    value: number

    @ApiProperty({
        description: 'Fecha actualizada, fecha actual',
        type: 'string',
        example: '18/01/2025::09:20:34'
    })
    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP',
        update: true
    })
    fecha: Date

    @ApiProperty({
        description: 'Fecha de creación del registro',
        type: 'string',
        example: '18/01/2025::08:20:34'
    })
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
        update: false
    })
    createdAt: Date
}