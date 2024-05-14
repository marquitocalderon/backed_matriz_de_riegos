import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto, UpdateUsuarioDto } from './dto/usuarios.dto';

import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PermisoPara } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiBearerAuth()
@ApiTags("USUARIOS")
@Controller('usuarios')
@UseGuards(AuthGuard, RolesGuard)
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) { }

    @Get()
    @PermisoPara(Role.ADMIN)
    getUsuarios() {
        return this.usuarioService.obtenerTodosLosUsuarios();
    }

    @Get(':id')
    @PermisoPara(Role.ADMIN)
    getPerfilById(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.obtenerPorID(id);
    }

    @Post()
    @ApiExcludeEndpoint()
    @PermisoPara(Role.ADMIN)
    @UseInterceptors(FileInterceptor('imagen'))
    postUsuarios(@UploadedFile() imagen: Express.Multer.File, @Body() datosDelFormulario: CrearUsuarioDto,) {
  
        // // Verificar si el mimetype es de una imagen
        // // Verificar si se proporcionó una imagen y si es del tipo esperado
        // if (imagen && imagen.mimetype.startsWith('image/')) {
        //     // Si se proporciona una imagen válida, llamar a lid_usuarioa función para procesar la imagen
        //     return this.usuarioService.crearUsuario(datosDelFormulario, imagen);
        // }

        // else if (imagen === undefined) {
        //     return this.usuarioService.crearUsuario(datosDelFormulario, imagen);
        // }

        // else {
        //     // Si no se proporciona una imagen o es de un tipo no válido, continuar con la actualización sin imagen
        //     return { message: "POR FAVOR ENVIAR UNA IMAGEN QUE SOLO SEA IMAGEN OK" }
        // }
    }

    @Put(':id')
    @PermisoPara(Role.ADMIN)
    @UseInterceptors(FileInterceptor('imagen'))
    actualizarUsuario(
        @UploadedFile() imagen: Express.Multer.File,
        @Param('id', ParseIntPipe) id_usuario: number,
        @Body() datosDelFronted: UpdateUsuarioDto
    ) {
        // Verificar si se proporcionó una imagen y si es del tipo esperado
        if (imagen && imagen.mimetype.startsWith('image/')) {
            // Si se proporciona una imagen válida, llamar a la función para procesar la imagen
            return this.usuarioService.actualizarUsuario(id_usuario, datosDelFronted, imagen);
        }

        else if (imagen === undefined) {
            return this.usuarioService.actualizarUsuario(id_usuario, datosDelFronted, imagen);
        }

        else {
            // Si no se proporciona una imagen o es de un tipo no válido, continuar con la actualización sin imagen
            return { message: "POR FAVOR ENVIAR UNA IMAGEN QUE SOLO SEA IMAGEN OK" }
        }
    }


  

}
