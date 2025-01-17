import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'coins'
})
export class Coin{
    @ApiProperty({
        description: 'uuid, se genera automáticamente11',
        type: 'string',
        example: '8eab36aa-398d-4a25-8dc0-63be3c5c633f'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty({
        description: 'Nombre de la moneda',
        type: 'string',
        example: 'coin'
    })
    @IsString()
    @IsNotEmpty()
    @Column({
        type: 'varchar',
        length: '50',
        nullable: false,
        unique: true
    })
    name: string

    @ApiProperty({
        description: 'Valor actual de la moneda',
        type: 'number',
        example: 10,
        default: 0
    })
    @Column({
        type: 'decimal',
        default: 0,
    })
    valorActual: number
}