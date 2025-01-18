import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class coinValueHistoricalDto{
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
}