import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuariosEntity } from "../usuarios/usuarios.entity";


@Entity({name: "matriz"})
export class MatrizEntity {

    @PrimaryGeneratedColumn()
    id_matriz: number;

    @Column()
    nombre_matriz: string;

    @Column({default : true})
    estado_matriz: boolean;

    
    @ManyToOne(() => UsuariosEntity, (data) => data.id_usuario, {
        eager: true, // para que traiga todos los datos de la columna relacionada
    })
    @JoinColumn({ name: "id_usuario" })
    usuarios: UsuariosEntity;



}
