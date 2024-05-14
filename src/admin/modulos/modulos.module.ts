import { Module } from '@nestjs/common';
import { ModulosController } from './modulos.controller';
import { ModulosService } from './modulos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuloEntity } from './modulos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuloEntity])],
  controllers: [ModulosController],
  providers: [ModulosService],
  exports: [ModulosService]
})
export class ModulosModule {}
