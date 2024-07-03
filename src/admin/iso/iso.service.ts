import { Injectable } from '@nestjs/common';
import { CreateIsoDto } from './dto/create-iso.dto';
import { UpdateIsoDto } from './dto/update-iso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsoEntity } from './iso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsoService {

  constructor(@InjectRepository(IsoEntity) private isoRepository: Repository<IsoEntity>){}

  create(createIsoDto: CreateIsoDto) {
    return 'This action adds a new iso';
  }

  async findAll() {
    
    const eventos = await this.isoRepository.find()
    return eventos

  }

  findOne(id: number) {
    return `This action returns a #${id} iso`;
  }

  update(id: number, updateIsoDto: UpdateIsoDto) {
    return `This action updates a #${id} iso`;
  }

  remove(id: number) {
    return `This action removes a #${id} iso`;
  }
}
