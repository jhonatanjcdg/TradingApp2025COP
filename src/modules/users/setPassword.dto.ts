import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SetPasswordDto{
    @ApiProperty({
        description: 'Nueva contraseña del usuario',
        type: 'string',
        example: 'NewPass123.'
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,15}$/,{
        message: 'The password must be between 8 and 15 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*.)',
    })
    newPassword: string

    @ApiProperty({
        description: 'Confirmación de la nueva contraseña',
        type: 'string',
        example: 'NewPass123.'
    })
    @IsString()
    @IsNotEmpty({
        message: 'la confirmación de la nueva contraseña es requerida'
    })
    confirmPassword: string
}