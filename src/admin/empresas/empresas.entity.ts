
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "empresas"})
export class EmpresaEntity {

    @PrimaryGeneratedColumn()
    id_empresa: number;

    @Column()
    nombre_empresa: string;

    @Column({default: true})
    estado_empresa: boolean;



}