import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MatrizService } from './matriz.service';
import { MatrizDTO } from './matriz.dto';

@Controller('matriz')
export class MatrizController {


    constructor(private service: MatrizService) { }

    @Get()
    obtenerMatriz() {
        return this.service.obtenerAll();
    }
    
    @Get(':id')
    getPerfilById(@Param('id', ParseIntPipe) id:number){
        return this.service.getDataByid(id)
    }

    @Post()
    crearMatriz(@Body() body: any){
        return this.service.crearDato(body);
    } 

}
