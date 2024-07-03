import { Module } from '@nestjs/common';
import { IsoService } from './iso.service';
import { IsoController } from './iso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsoEntity } from './iso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IsoEntity])],
  controllers: [IsoController],
  providers: [IsoService],
  exports: [IsoService]
})
export class IsoModule {}
