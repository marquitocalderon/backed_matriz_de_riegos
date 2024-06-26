import { Body, Controller, Post } from '@nestjs/common';
import { MatrizService } from './matriz.service';
import { MatrizDTO } from './matriz.dto';

@Controller('matriz')
export class MatrizController {


    constructor(private service: MatrizService) { }


  @Post()
    crearMatriz(@Body() body: MatrizDTO){
        return this.service.crearDato(body);
    } 

}
