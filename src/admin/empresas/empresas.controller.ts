import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostEmpresaDto } from './dto/empresas.dto';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {

    constructor(private empresaService: EmpresasService){}

    @Get()
    getEmpresas() {
        return "Aqui se obtendran todas las empresas"
    }

    @Post()
    postEmpresas(@Body() datosDelFrontend: PostEmpresaDto) {
        return this.empresaService.postEmpresas(datosDelFrontend)
    }


}
