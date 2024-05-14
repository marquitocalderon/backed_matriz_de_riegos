import { Body, Controller, Get, Post, Param, ParseIntPipe,Patch, Delete, UseGuards } from '@nestjs/common';
import { CrearPerfilDto, UpdatePerfilDTO } from './dto/perfiles.dto';
import { PerfilesService } from './perfiles.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermisoPara } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/enums/role.enum';
import { AUTENTICACION_PARA_EL } from '../auth/decorators/auth.decorator';

@ApiBearerAuth()
@ApiTags("PERFILES")
@Controller('perfiles')
@AUTENTICACION_PARA_EL(Role.ADMIN)
export class PerfilesController {

    constructor(private perfilService: PerfilesService){}

    @Get()
    getPerfiles(){
        return this.perfilService.obtenerTodoslosPerfiles()
    }

    
    @Get(':id')
    getPerfilById(@Param('id', ParseIntPipe) id:number){
        return this.perfilService.obtenerPorID(id)
    }

    @Post()
    postPerfiles(@Body() datosDelFrontendPerfil: CrearPerfilDto){
        return this.perfilService.insertarPerfiles(datosDelFrontendPerfil)

    }

    @Patch(':id')
    actualizarPerfil(@Param('id', ParseIntPipe) id:number, @Body() datosDelFronted: UpdatePerfilDTO ){
        return this.perfilService.actualizarPerfil(id, datosDelFronted)
    }

    @Delete(':id')
    deletePERFIL(@Param('id', ParseIntPipe) id:number){
        return this.perfilService.deletePerfil(id)
    }

}
