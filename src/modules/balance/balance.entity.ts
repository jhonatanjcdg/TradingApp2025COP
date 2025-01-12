import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity({
    name: 'balance'
})
export class Balance{
    /**
     * UUID del usuario -> Se genera automáticamente
     * @example 8eab36aa-398d-4a25-8dc0-63be3c5c633f
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    balance: string

    /**
     * Debe ser un email valido
     * @example  $1000
     */
    @Column({
        type: 'varchar',
        length: '50',
        unique: true,
        nullable: false
    })
    createdAt: Date
}