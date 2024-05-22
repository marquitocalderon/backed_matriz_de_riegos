import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosEntity } from './eventos.entity';
import { UsuariosEntity } from '../usuarios/usuarios.entity';
import { EmpresaEntity } from '../empresas/empresas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventosEntity, UsuariosEntity, EmpresaEntity])],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService]
})
export class EventosModule {}
