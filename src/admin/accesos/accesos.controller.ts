import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AccesosService } from './accesos.service';
import { CrearPermisosDTO } from './dto/accesos.dto.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermisoPara } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';


@ApiBearerAuth()
@Controller('accesos')
export class AccesosController {

    constructor(private accesoServicio: AccesosService){}

    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    obtenerAccesos(){
        return this.accesoServicio.obtenerDatos();
    }

    @UseGuards(AuthGuard, RolesGuard)
    @PermisoPara(Role.ADMIN)
    @Post()
    postAccesos(@Body() crearPermisosDTO: CrearPermisosDTO) {
      return this.accesoServicio.postPermisoDatos(crearPermisosDTO)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @PermisoPara(Role.ADMIN)
    @Put()
    putAccesos(@Body() editarPermisos: CrearPermisosDTO) {
      return this.accesoServicio.putPermisoDatos(editarPermisos)
    }
}
