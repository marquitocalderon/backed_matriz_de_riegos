import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MatrizService } from './matriz.service';
import { MatrizDTO } from './matriz.dto';

@Controller('matriz')
export class MatrizController {


    constructor(private service: MatrizService) { }

    @Get()
    obtenerMatriz() {
        return this.service.getData();
    }
     
    @Post()
    crearMatriz(@Body() body: MatrizDTO){
        return this.service.crearDato(body);
    } 

}
