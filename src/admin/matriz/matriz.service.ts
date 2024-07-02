import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatrizEntity } from './matriz.entity';
import { UsuariosEntity } from '../usuarios/usuarios.entity';
import { Repository } from 'typeorm';
import { MatrizDTO } from './matriz.dto';

@Injectable()
export class MatrizService {


    
    constructor(@InjectRepository(MatrizEntity) private matrizRepository: Repository<MatrizEntity>,
        @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
    ) { }


    async obtenerAll(): Promise<any[]> {
        const matrizs = await this.matrizRepository.find({
            order: {
                id_matriz: "DESC"
            },
            where: {
                estado_matriz: true
            }
        });

        // Transforma los datos a un array de objetos sin utilizar un DTO
        return matrizs.map(matriz => {
            return {
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

                // Puedes mapear otros campos según sea necesario
            };
        });
    }

    getDataByid(id_empresa : any) {
        return this.matrizRepository.find({
            relations: ['usuarios'],
            where: {
                estado_matriz: true,
                usuarios: {
                    sucursales: {
                        empresas: {
                            id_empresa: id_empresa
                        }
                    }
                }
            }
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

        const nuevoDato = this.matrizRepository.create({
            ...body,
            usuarios: datoEncontrado
        });

        await this.matrizRepository.save(nuevoDato);
        return { message: 'Se registró correctamente' };
    }




}
