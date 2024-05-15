import { Module } from '@nestjs/common';
import { SucursalesController } from './sucursales.controller';
import { SucursalesService } from './sucursales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaEntity } from '../empresas/empresas.entity';
import { SucursalesEntity } from './sucursales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalesEntity, EmpresaEntity])],
  controllers: [SucursalesController],
  providers: [SucursalesService]
})
export class SucursalesModule {}
