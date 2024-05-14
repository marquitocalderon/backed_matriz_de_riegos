import { Module } from '@nestjs/common';
import { CasosController } from './casos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasosEntity } from './casos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CasosEntity])],
  controllers: [CasosController]
})
export class CasosModule {}
