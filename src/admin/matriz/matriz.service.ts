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


    getData() {
        return this.matrizRepository.find({
            relations: ['usuarios'],
            where: {
                estado_matriz: true,
            }
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




    
    async crearDato(body: MatrizDTO) {
        const datoEncontrado = await this.usuarioRepository.findOne({
            where: {
                id_usuario: parseInt(body.idusuario, 10),
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
