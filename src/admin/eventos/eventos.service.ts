import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventosEntity } from './eventos.entity';
import { Repository } from 'typeorm';
import { UsuariosEntity } from '../usuarios/usuarios.entity';
import { interval } from 'rxjs';

@Injectable()
export class EventosService {


    constructor(@InjectRepository(EventosEntity) private eventosRepository: Repository<EventosEntity>,
        @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
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
                usuario: evento.usuarios,
                nombre_evento: evento.nombre_evento,
                nivel_riesgo: evento.nivel_riesgo,
                probabilidad: evento.probabilidad,
                impacto : evento.impacto,
                valor: evento.valor,
                matriz_impacto: {
                    minima: evento.minima,
                    menor: evento.menor,
                    moderada: evento.moderada,
                    mayor: evento.mayor,
                    maxima: evento.maxima,
                },
                matriz_probabilidad: {
                    muy_alta: evento.muy_alta,
                    alta: evento.alta,
                    media: evento.media,
                    baja: evento.baja,
                    muy_baja: evento.muy_baja,
                },
                intervalo_verde: [
                    {
                        de_verde: evento.de_verde,
                        a_verde: evento.a_verde
                    }
                ],
                intervalo_amarillo: [
                    {
                        de_amarillo: evento.de_amarillo,
                        a_amarillo: evento.a_amarillo
                    }
                ],
                intervalo_naranja: [
                    {
                        de_naranja: evento.de_naranja,
                        a_naranja: evento.a_naranja
                    }
                ],
                intervalo_rojo: [
                    {
                        de_rojo: evento.de_rojo,
                        a_rojo: evento.a_rojo
                    }
                ]

                // Puedes mapear otros campos según sea necesario
            };
        });
    }

    async obtenerAllbyEmpresa(id_empresa: any): Promise<any[]> {
        const eventos = await this.eventosRepository.find({
            order: {
                id_evento: "DESC"
            },
            where: {
                estado: true,
                usuarios: {
                    sucursales: {
                        empresas: {
                            id_empresa: id_empresa
                        }
                    }
                }
            }
        });
    
        // Transforma los datos a un array de objetos sin utilizar un DTO
        return eventos.map(evento => {
            return {
                id_evento: evento.id_evento,
                usuario: evento.usuarios,
                nombre_evento: evento.nombre_evento,
                nivel_riesgo: evento.nivel_riesgo,
                probabilidad: evento.probabilidad,
                impacto : evento.impacto,
                valor: evento.valor,
                matriz_impacto: {
                    minima: evento.minima,
                    menor: evento.menor,
                    moderada: evento.moderada,
                    mayor: evento.mayor,
                    maxima: evento.maxima,
                },
                matriz_probabilidad: {
                    muy_alta: evento.muy_alta,
                    alta: evento.alta,
                    media: evento.media,
                    baja: evento.baja,
                    muy_baja: evento.muy_baja,
                },
                intervalo_verde: [
                    {
                        de_verde: evento.de_verde,
                        a_verde: evento.a_verde
                    }
                ],
                intervalo_amarillo: [
                    {
                        de_amarillo: evento.de_amarillo,
                        a_amarillo: evento.a_amarillo
                    }
                ],
                intervalo_naranja: [
                    {
                        de_naranja: evento.de_naranja,
                        a_naranja: evento.a_naranja
                    }
                ],
                intervalo_rojo: [
                    {
                        de_rojo: evento.de_rojo,
                        a_rojo: evento.a_rojo
                    }
                ]
    
                // Puedes mapear otros campos según sea necesario
            };
        });
    }
    

    async crearDato(body: any) {
        const datoEncontrado = await this.usuarioRepository.findOne({
            where: {
                id_usuario: parseInt(body.id_usuario, 10),
                estado_usuario: true,
            }// Lista de campos que deseas seleccionar
        });

        if (!datoEncontrado) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        if (!datoEncontrado.estado_usuario) {
            throw new HttpException('Usuario Eliminado', HttpStatus.NOT_FOUND);
        }

        console.log(body);

        const nuevoDato = this.eventosRepository.create({
            ...body,
            usuarios: datoEncontrado
        });

        await this.eventosRepository.save(nuevoDato);
        return { message: 'Se registró correctamente' };
    }
}
