import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IsoService } from './iso.service';
import { CreateIsoDto } from './dto/create-iso.dto';
import { UpdateIsoDto } from './dto/update-iso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Iso')
@Controller('iso')
export class IsoController {
  constructor(private readonly isoService: IsoService) {}

  @Post()
  create(@Body() createIsoDto: CreateIsoDto) {
    return this.isoService.create(createIsoDto);
  }

  @Get()
  findAll() {
    return this.isoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.isoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIsoDto: UpdateIsoDto) {
    return this.isoService.update(+id, updateIsoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.isoService.remove(+id);
  }
}
