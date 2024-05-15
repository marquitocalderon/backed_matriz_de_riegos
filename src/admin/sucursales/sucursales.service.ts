import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaEntity } from '../empresas/empresas.entity';
import { Repository } from 'typeorm';
import { SucursalesEntity } from './sucursales.entity';
import { PostSucursalDto } from './sucursales.dto';

@Injectable()
export class SucursalesService {

    constructor(@InjectRepository(EmpresaEntity) private empresaRepository: Repository<EmpresaEntity>,
        @InjectRepository(SucursalesEntity) private sucursalRepository: Repository<SucursalesEntity>
    ) { }

    getAllSucursales() {
        return this.sucursalRepository.find()
    }

    async createSucursal(datosFrontend: PostSucursalDto) {
        const empresaEncontrada = await this.empresaRepository.findOne({
            where: {
                id_empresa: parseInt(datosFrontend.idempresa, 10),
                estado_empresa: true,
            }// Lista de campos que deseas seleccionar
        });

        if (!empresaEncontrada) {
            throw new HttpException('Empresa no encontrado', HttpStatus.NOT_FOUND);
        }

        if (!empresaEncontrada.estado_empresa) {
            throw new HttpException('Empresa Eliminado', HttpStatus.NOT_FOUND);
        }


        const nuevaEmpresa = this.sucursalRepository.create({
            nombre_sucursal: datosFrontend.nombre_sucursal,
            empresas: empresaEncontrada,
        });

        await this.sucursalRepository.save(nuevaEmpresa);

        return { message: 'Se registró correctamente' };
    }

}
