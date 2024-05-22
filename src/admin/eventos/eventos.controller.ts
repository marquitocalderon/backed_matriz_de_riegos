import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {

    constructor(private service : EventosService) { }

    @Get()
    getEventos() {
        return this.service.obtenerAll();
    }

    @Get(':id')
    getPerfilById(@Param('id', ParseIntPipe) id:number){
        return this.service.obtenerAllbyEmpresa(id);
    }

    @Post()
    createEvento(@Body() body: any){
        return this.service.crearDato(body);
    } 

}
