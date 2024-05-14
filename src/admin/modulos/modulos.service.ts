import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuloEntity } from './modulos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModulosService {

    constructor(@InjectRepository(ModuloEntity) private modulorepositorio: Repository<ModuloEntity>) { }

    obtenerTodos() {
        return this.modulorepositorio.find({
            order: {
                id_modulo: 'ASC',
            }
        })
    }

}
