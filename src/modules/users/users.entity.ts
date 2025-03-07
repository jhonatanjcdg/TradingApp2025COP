import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity({
    name: 'users'
})
export class User{
    /**
     * UUID del usuario -> Se genera automáticamente
     * @example 8eab36aa-398d-4a25-8dc0-63be3c5c633f
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /**
     * El nombre no debe estar vacío
     * @example test
     */
    @Column({
        type: 'varchar',
        length: '100',
        nullable: false
    })
    name: string

    /**
     * Debe ser un email valido
     * @example  test@test.com
     */
    @Column({
        type: 'varchar',
        length: '50',
        unique: true,
        nullable: false
    })
    email: string

    /**
     * La contraseña debe ser mayor a 8 caracteres y debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*.,
     * @example Test123.
     */
    @Column({
        type: "varchar",
        length: '500',
        nullable: false
    })
    password: string

    /**
     * Balance que tiene cada persona, por defecto es 0
     * @example 0
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0
    })
    balance: number

    // createdAt
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
        update: false,
    })
    createdAt: Date
}