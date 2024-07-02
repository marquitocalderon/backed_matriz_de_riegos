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

    
    @ManyToOne(() => MatrizEntity, (data) => data.id_matriz, {
        eager: true, // para que traiga todos los datos de la columna relacionada
    })
    @JoinColumn({ name: "id_matriz" })
    matrices: MatrizEntity;


}
