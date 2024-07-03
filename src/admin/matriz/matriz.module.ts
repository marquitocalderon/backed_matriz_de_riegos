import { Module } from '@nestjs/common';
import { MatrizController } from './matriz.controller';
import { MatrizService } from './matriz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrizEntity } from './matriz.entity';
import { UsuariosEntity } from '../usuarios/usuarios.entity';
import { EventosEntity } from '../eventos/eventos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatrizEntity, UsuariosEntity, EventosEntity])],
  controllers: [MatrizController],
  providers: [MatrizService],
  exports: [MatrizService],
})
export class MatrizModule {}
