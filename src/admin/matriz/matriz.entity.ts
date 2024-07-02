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



    @Column()
    minima: number;

    @Column()
    menor: number;

    @Column()
    moderada: number;

    @Column()
    mayor: number;

    @Column()
    maxima: number;

    @Column()
    muy_alta: number;

    @Column()
    alta: number;

    @Column()
    media: number;

    @Column()
    baja: number;

    @Column()
    muy_baja: number;

    @Column()
    de_amarillo: number;

    @Column()
    a_amarillo: number;

    @Column()
    de_naranja: number;

    @Column()
    a_naranja: number;

    @Column()
    de_rojo: number;

    @Column()
    a_rojo: number;

    @Column()
    de_verde: number;

    @Column()
    a_verde: number;

    
    @ManyToOne(() => UsuariosEntity, (data) => data.id_usuario, {
        eager: true, // para que traiga todos los datos de la columna relacionada
    })
    @JoinColumn({ name: "id_usuario" })
    usuarios: UsuariosEntity;



}
