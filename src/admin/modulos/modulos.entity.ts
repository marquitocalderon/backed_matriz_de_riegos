
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "modulos"})
export class ModuloEntity {

    @PrimaryGeneratedColumn()
    id_modulo: number;

    @Column({unique: true})
    modulo: string;


}