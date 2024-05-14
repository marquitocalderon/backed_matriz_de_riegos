
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PerfilesEntity } from "../perfiles/perfiles.entity";
import { ModuloEntity } from "../modulos/modulos.entity";


@Entity({name: "accesos"})
export class AccesoEntity {

    @PrimaryGeneratedColumn()
    id_acceso: number;

    @ManyToOne(() => PerfilesEntity, (perfil) => perfil.id_perfil, {
        // cascade: true,
        eager: true, // para que traiga todos los datos de la columna relacionada
      })
    @JoinColumn({name: "id_perfil"})
    perfiles: PerfilesEntity

    @ManyToOne(() => ModuloEntity, (modulo) => modulo.id_modulo, {
        // cascade: true,
        eager: true, // para que traiga todos los datos de la columna relacionada
      })
    @JoinColumn({name: "id_modulo"})
    modulos: ModuloEntity


    @Column()
    activo: boolean;

    



    



}