import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresasService {

    
    constructor(@InjectRepository(EmpresaEntity) private empresaRepository: Repository<EmpresaEntity>) {}

}
