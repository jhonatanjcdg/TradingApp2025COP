import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UserDto{
    @ApiProperty({
        description: 'Nombre del usuario',
        type: 'string',
        example: "test"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email del usuario',
        type: 'string',
        example: 'test@test.com'
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        description: 'La contraseña debe ser mayor a 8 caracteres y debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*.,',
        type: 'string',
        example: 'Test123.'
    })
    @IsNotEmpty()
    password: string;

    // @ApiProperty({
    //     description: 'Balance que tiene cada persona, por defecto es 0',
    //     type: 'number',
    //     example: 0.0
    // })
    // balance: number;
}