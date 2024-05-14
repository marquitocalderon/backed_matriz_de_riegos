
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "casos"})
export class CasosEntity {

    @PrimaryGeneratedColumn()
    id_caso: number;

    @Column({unique: true})
    numero_caso: string;


}