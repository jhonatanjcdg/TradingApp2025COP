import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'coinValuesHistorical'
})
export class CoinValueHistorical{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: 'numeric',
        default: 10
    })
    value: number

    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP',
        update: true
    })
    fecha: Date

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
        update: false
    })
    createdAt: Date
}