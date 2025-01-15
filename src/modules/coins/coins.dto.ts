import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CoinDto {
    @ApiProperty({
        description: 'Nombre de la moneda',
        type: 'string',
        example: 'coin'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Valor actual de la moneda',
        type: 'number',
        example: 10,
        default: 0
    })
    valorActual: number
}
