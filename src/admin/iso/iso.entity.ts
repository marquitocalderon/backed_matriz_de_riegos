import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuariosEntity } from "../usuarios/usuarios.entity";
import { EmpresaEntity } from "../empresas/empresas.entity";
import { MatrizEntity } from "../matriz/matriz.entity";

@Entity({name: "iso"})
export class IsoEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    dominio: string;
  
    @Column({ type: 'text' })
    objetivo: string;
  
    @Column({ type: 'text' })
    control: string;
}