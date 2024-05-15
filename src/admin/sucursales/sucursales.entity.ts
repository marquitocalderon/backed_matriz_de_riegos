
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpresaEntity } from "../empresas/empresas.entity";


@Entity({name: "sucursales"})
export class SucursalesEntity {

    @PrimaryGeneratedColumn()
    id_sucursal: number;

    @Column({ length: 16 , unique: true}) // Especifica la longitud máxima de la columna usuario
    nombre_sucursal: string;

    @Column({default: true})
    estado: boolean;

    @ManyToOne(() => EmpresaEntity, (empresa) => empresa.id_empresa, {
        // cascade: true,
        eager: true, // para que traiga todos los datos de la columna relacionada
      })
    @JoinColumn({name: "idempresa"})
    empresas: EmpresaEntity

    

}
