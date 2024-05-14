import { Module } from '@nestjs/common';
import { AccesosController } from './accesos.controller';
import { AccesosService } from './accesos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoEntity } from './accesos.entity';
import { ModuloEntity } from '../modulos/modulos.entity';
import { PerfilesEntity } from '../perfiles/perfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccesoEntity, PerfilesEntity, ModuloEntity])],
  controllers: [AccesosController],
  providers: [AccesosService],
  exports:[AccesosService]
})
export class AccesosModule {}
