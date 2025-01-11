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
     * @example  test@test.co
     */
    @Column({
        type: 'varchar',
        length: '50',
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        type: "varchar",
        length: '500',
        nullable: false
    })
    password: string

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