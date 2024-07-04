import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
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

    @Get('usuarios/:id_usuario')
    getUsuario(@Param('id_usuario', ParseIntPipe) id_usuario: number) {
        return this.service.obtenerEventosPorUsuario(id_usuario);
    }

    @Get('matriz/:id_matriz')
    getMatriz(@Param('id_matriz', ParseIntPipe) id_matriz: number) {
        return this.service.obtenerEventosPorMatriz(id_matriz);
    }



 

    @Post()
    createEvento(@Body() body: any){
        return this.service.crearDato(body);
    } 

    @Put('cambiar/:id_evento')
    putEventos(
        @Param('id_evento', ParseIntPipe) id_evento: number,
        @Body() body: any
    ) {
        return this.service.patchDato(id_evento, body);
    }


}
