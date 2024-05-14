import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresas.entity';
import { Repository } from 'typeorm';
import { PostEmpresaDto } from './dto/empresas.dto';

@Injectable()
export class EmpresasService {


    constructor(@InjectRepository(EmpresaEntity) private empresaRepository: Repository<EmpresaEntity>) { }

    getAllEmpresas() {
        return this.empresaRepository.find()
    }

    async postEmpresas(datosfrontend: PostEmpresaDto) {

        const EmpesaEncontrada = await this.empresaRepository.findOneBy({
            nombre_empresa: datosfrontend.nombre_empresa,
        })

        if (EmpesaEncontrada) {
            throw new HttpException('Empresa ya existe en la base de datos', HttpStatus.CONFLICT)
        }

        const nuevaEmpresa = this.empresaRepository.create(datosfrontend)
        await this.empresaRepository.save(nuevaEmpresa)
        return { empresa: "Se guardo Correctamente" }

    }

}
