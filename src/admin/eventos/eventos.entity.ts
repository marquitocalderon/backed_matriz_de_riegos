import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuariosEntity } from "../usuarios/usuarios.entity";
import { EmpresaEntity } from "../empresas/empresas.entity";
import { MatrizEntity } from "../matriz/matriz.entity";

@Entity({name: "eventos"})
export class EventosEntity {

    @PrimaryGeneratedColumn()
    id_evento: number;

    @Column({ default: true })
    estado: boolean;

    @Column() // Especifica la longitud máxima permitida
    nombre_evento: string;

    @Column() // Especifica la longitud máxima permitida
    nivel_riesgo: string;

    @Column() // Especifica la longitud máxima permitida
    probabilidad: string;

    
    @Column() // Especifica la longitud máxima permitida
    impacto: string;

    @Column()
    valor: number;

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

    
    @ManyToOne(() => MatrizEntity, (data) => data.id_matriz, {
        eager: true, // para que traiga todos los datos de la columna relacionada
    })
    @JoinColumn({ name: "id_matriz" })
    matrices: MatrizEntity;


}
