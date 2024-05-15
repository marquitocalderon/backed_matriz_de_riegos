import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostSucursalDto } from './sucursales.dto';
import { SucursalesService } from './sucursales.service';

@Controller('sucursales')
export class SucursalesController {
    constructor(private sucursalService: SucursalesService){}
    @Get()
    getAllSucursales(){
        return this.sucursalService.getAllSucursales()
    }

    @Post()
    createSucursal(@Body() datosFrontend: PostSucursalDto ){
        return this.sucursalService.createSucursal(datosFrontend)
    }

}
