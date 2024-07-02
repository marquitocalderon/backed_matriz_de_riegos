import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventosEntity } from './eventos.entity';
import { Repository } from 'typeorm';
import { UsuariosEntity } from '../usuarios/usuarios.entity';
import { interval } from 'rxjs';
import { MatrizEntity } from '../matriz/matriz.entity';

@Injectable()
export class EventosService {


    constructor(@InjectRepository(EventosEntity) private eventosRepository: Repository<EventosEntity>,
        @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
        @InjectRepository(MatrizEntity) private matrizRepository: Repository<MatrizEntity>,
    ) { }
    async obtenerAll(): Promise<any[]> {
        const eventos = await this.eventosRepository.find({
            order: {
                id_evento: "DESC"
            },
            where: {
                estado: true
            }
        });

        // Transforma los datos a un array de objetos sin utilizar un DTO
        return eventos.map(evento => {
            return {
                id_evento: evento.id_evento,
                matriz : evento.matrices,
                nombre_evento: evento.nombre_evento,
                nivel_riesgo: evento.nivel_riesgo,
                probabilidad: evento.probabilidad,
                impacto : evento.impacto,
                estado: evento.estado,
          

                // Puedes mapear otros campos según sea necesario
            };
        });
    }

    async getSegunLaMatriz(id_matriz: any, id_empresa : any): Promise<any[]> {
        const eventos = await this.eventosRepository.find({
            order: {
                id_evento: "DESC"
            },
            where: {
                matrices: {id_matriz: id_matriz},
                estado: true,
            }
        });
    
        // Transforma los datos a un array de objetos sin utilizar un DTO
        return eventos.map(evento => {
            return {
                id_evento: evento.id_evento,
                matriz : evento.matrices,
                nombre_evento: evento.nombre_evento,
                nivel_riesgo: evento.nivel_riesgo,
                probabilidad: evento.probabilidad,
                impacto : evento.impacto,
                valor: evento.valor,
                estado: evento.estado,

    
                // Puedes mapear otros campos según sea necesario
            };
        });
    }
    

    async crearDato(body: any) {


        const datoEncontrado2 = await this.matrizRepository.findOne({
            where: {
                id_matriz: parseInt(body.id_matriz, 10),
                estado_matriz: true,
            }// Lista de campos que deseas seleccionar
        });

        if (!datoEncontrado2) {
            throw new HttpException('Matriz no encontrado', HttpStatus.NOT_FOUND);
        }

        if (!datoEncontrado2.estado_matriz) {
            throw new HttpException('Matriz Eliminado', HttpStatus.NOT_FOUND);
        }



        const nuevoDato = this.eventosRepository.create({
            ...body,
            matrices: datoEncontrado2
        });

        await this.eventosRepository.save(nuevoDato);
        return { message: 'Se registró correctamente' };
    }
}
