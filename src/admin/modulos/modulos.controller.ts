import { Controller, Get, UseGuards } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('modulos')
export class ModulosController {


    constructor(private moduloServicio: ModulosService){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    getModulos(){
        return this.moduloServicio.obtenerTodos()
    }   
}
