import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {

    constructor(private service : EventosService) { }

    @Get()
    getEventos() {
        return this.service.obtenerAll();
    }

    @Get(':id_evento')
    getEvento(@Param('id_evento', ParseIntPipe) id_evento: number) {
        return this.service.obtenerPorEvento(id_evento);
    }


    @Get(':id_matriz')
    getIdMatriz(
        @Param('id_matriz', ParseIntPipe) id_matriz: number,
        @Query('id_empresa', ParseIntPipe) id_empresa: number
    ) {
        return this.service.getSegunLaMatriz(id_matriz, id_empresa);
    }

    @Post()
    createEvento(@Body() body: any){
        return this.service.crearDato(body);
    } 

}
