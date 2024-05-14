import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostEmpresaDto } from './dto/empresas.dto';

@Controller('empresas')
export class EmpresasController {


    @Get()
    getEmpresas() {
        return "Aqui se obtendran todas las empresassad"
    }

    @Post()
    postEmpresas(@Body() datosDelFrontend: PostEmpresaDto) {
        return datosDelFrontend
    }


}
