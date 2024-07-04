import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
                id_evento: 'DESC'
            },
            where: {
                estado: true
            },
            relations: ['matrices'] // Asegúrate de que 'matrices' es el nombre correcto de la relación
        });

        // Transforma los datos a un array de objetos sin utilizar un DTO
        return eventos.map(evento => {
            const matriz = evento.matrices; // Asumiendo que 'matrices' es una relación one-to-one

            return {
                id_evento: evento.id_evento,
                usuarios: evento.usuarios,
                matriz: {
                    id_matriz: matriz.id_matriz,
                    nombre_matriz: matriz.nombre_matriz,
                    usuario: matriz.usuarios,
                    matriz_impacto: {
                        minima: matriz.minima,
                        menor: matriz.menor,
                        moderada: matriz.moderada,
                        mayor: matriz.mayor,
                        maxima: matriz.maxima,
                    },
                    matriz_probabilidad: {
                        muy_alta: matriz.muy_alta,
                        alta: matriz.alta,
                        media: matriz.media,
                        baja: matriz.baja,
                        muy_baja: matriz.muy_baja,
                    },
                    intervalo_verde: [
                        {
                            de_verde: matriz.de_verde,
                            a_verde: matriz.a_verde
                        }
                    ],
                    intervalo_amarillo: [
                        {
                            de_amarillo: matriz.de_amarillo,
                            a_amarillo: matriz.a_amarillo
                        }
                    ],
                    intervalo_naranja: [
                        {
                            de_naranja: matriz.de_naranja,
                            a_naranja: matriz.a_naranja
                        }
                    ],
                    intervalo_rojo: [
                        {
                            de_rojo: matriz.de_rojo,
                            a_rojo: matriz.a_rojo
                        }
                    ]
                },
                nombre_evento: evento.nombre_evento,
                nivel_riesgo: evento.nivel_riesgo,
                probabilidad: evento.probabilidad,
                impacto: evento.impacto,
                valor: evento.valor,
                dominio: evento.dominio,
                objetivo: evento.objetivo,
                control: evento.control,
                estado: evento.estado,
            };
        });
    }

    async obtenerPorEvento(id_evento: number): Promise<any[]> {
        const evento = await this.eventosRepository.findOne({
            where: { id_evento, estado: true },
            relations: ['matrices']
        });
    
        if (!evento) {
            throw new NotFoundException('Evento no encontrado');
        }
    
        const matriz = evento.matrices;
    
        return [{
            id_evento: evento.id_evento,
            usuarios: evento.usuarios,
            matriz: {
                id_matriz: matriz.id_matriz,
                nombre_matriz: matriz.nombre_matriz,
                usuario: matriz.usuarios,
                matriz_impacto: {
                    minima: matriz.minima,
                    menor: matriz.menor,
                    moderada: matriz.moderada,
                    mayor: matriz.mayor,
                    maxima: matriz.maxima,
                },
                matriz_probabilidad: {
                    muy_alta: matriz.muy_alta,
                    alta: matriz.alta,
                    media: matriz.media,
                    baja: matriz.baja,
                    muy_baja: matriz.muy_baja,
                },
                intervalo_verde: [
                    {
                        de_verde: matriz.de_verde,
                        a_verde: matriz.a_verde
                    }
                ],
                intervalo_amarillo: [
                    {
                        de_amarillo: matriz.de_amarillo,
                        a_amarillo: matriz.a_amarillo
                    }
                ],
                intervalo_naranja: [
                    {
                        de_naranja: matriz.de_naranja,
                        a_naranja: matriz.a_naranja
                    }
                ],
                intervalo_rojo: [
                    {
                        de_rojo: matriz.de_rojo,
                        a_rojo: matriz.a_rojo
                    }
                ]
            },
            nombre_evento: evento.nombre_evento,
            nivel_riesgo: evento.nivel_riesgo,
            probabilidad: evento.probabilidad,
            impacto: evento.impacto,
            valor: evento.valor,
            dominio: evento.dominio,
            objetivo: evento.objetivo,
            control: evento.control,
            estado: evento.estado,
        }];
    }

    async obtenerEventosPorUsuario(id_usuario: number): Promise<any[]> {
        const eventos = await this.eventosRepository.find({
            where: {
                estado: true,
                usuarios: { id_usuario } // Asumiendo que la relación está configurada correctamente
            },
            order: {
                id_evento: 'DESC'
            },
            relations: ['matrices', 'usuarios'] // Asegúrate de que 'matrices' y 'usuarios' son los nombres correctos de las relaciones
        });

        // Transforma los datos a un array de objetos sin utilizar un DTO
        return eventos.map(evento => {
            const matriz = evento.matrices; // Asumiendo que 'matrices' es una relación one-to-one

            return {
                id_evento: evento.id_evento,
                usuarios: evento.usuarios,
                matriz: {
                    id_matriz: matriz.id_matriz,
                    nombre_matriz: matriz.nombre_matriz,
                    usuario: matriz.usuarios,
                    matriz_impacto: {
                        minima: matriz.minima,
                        menor: matriz.menor,
                        moderada: matriz.moderada,
                        mayor: matriz.mayor,
                        maxima: matriz.maxima,
                    },
                    matriz_probabilidad: {
                        muy_alta: matriz.muy_alta,
                        alta: matriz.alta,
                        media: matriz.media,
                        baja: matriz.baja,
                        muy_baja: matriz.muy_baja,
                    },
                    intervalo_verde: [
                        {
                            de_verde: matriz.de_verde,
                            a_verde: matriz.a_verde
                        }
                    ],
                    intervalo_amarillo: [
                        {
                            de_amarillo: matriz.de_amarillo,
                            a_amarillo: matriz.a_amarillo
                        }
                    ],
                    intervalo_naranja: [
                        {
                            de_naranja: matriz.de_naranja,
                            a_naranja: matriz.a_naranja
                        }
                    ],
                    intervalo_rojo: [
                        {
                            de_rojo: matriz.de_rojo,
                            a_rojo: matriz.a_rojo
                        }
                    ]
                },
                nombre_evento: evento.nombre_evento,
                nivel_riesgo: evento.nivel_riesgo,
                probabilidad: evento.probabilidad,
                impacto: evento.impacto,
                valor: evento.valor,
                dominio: evento.dominio,
                objetivo: evento.objetivo,
                control: evento.control,
                estado: evento.estado,
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
            throw new HttpException('Uusuairo Eliminado', HttpStatus.NOT_FOUND);
        }



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
            matrices: datoEncontrado2,
            usuarios: datoEncontrado
        });

        await this.eventosRepository.save(nuevoDato);
        return { message: 'Se registró correctamente' };
    }


    async patchDato(id_evento: number, body?: any): Promise<any> {
        // Buscar el evento por su ID
        const evento = await this.eventosRepository.findOne({
            where: {
                id_evento: id_evento,
            },
            relations: ['usuarios']  // Incluir la relación 'usuarios' si es necesario
        });

        if (!evento) {
            throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
        }

        if (body !== undefined) {
            // Buscar el nuevo usuario por su ID
            const nuevoUsuario = await this.usuarioRepository.findOne({
                where: {
                    id_usuario: body.id_usuario,
                    estado_usuario: true,
                }
            });

            if (!nuevoUsuario) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }

            if (!nuevoUsuario.estado_usuario) {
                throw new HttpException('Usuario Eliminado', HttpStatus.NOT_FOUND);
            }

            // Actualizar el evento con el nuevo usuario
            evento.usuarios = nuevoUsuario;
        }

        // Guardar los cambios
        await this.eventosRepository.save(evento);

        return { message: 'Evento actualizado correctamente' };
    }
    
}
