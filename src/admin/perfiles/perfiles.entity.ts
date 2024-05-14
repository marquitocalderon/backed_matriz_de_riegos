
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuariosEntity } from "../usuarios/usuarios.entity";
import { AccesoEntity } from "../accesos/accesos.entity";

@Entity({name: "perfiles"})
export class PerfilesEntity {

    @PrimaryGeneratedColumn()
    id_perfil: number;

    @Column({unique: true})
    nombre_perfil: string;

    @Column({default: true})
    estado_perfil: boolean;

    @OneToMany(() => AccesoEntity, (acceso) => acceso.perfiles)
    modulos: AccesoEntity[];

}