import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto, RefreshTokenDTO } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AccesosService } from '../accesos/accesos.service';

// PARA USUAR JWT TOKEN SE INSTALA ESTO
// npm install --save @nestjs/jwt

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly accesosService: AccesosService,
  ) {}

  async login(datosFronted: LoginDto) {
    const usuario = await this.usuarioService.buscarParaLogin(
      datosFronted.usuario,
    );

    if (!usuario) {
      throw new UnauthorizedException('Usuario Incorrecto');
    }

    const passwordValidar = await bcryptjs.compare(
      datosFronted.password,
      usuario.password,
    );

    if (!passwordValidar) {
      throw new UnauthorizedException('Password Incorrecto');
    }

    // const accesosDeModulos = await this.accesosService.obtenerDatos();

    // const accesoPerfilUsuario = accesosDeModulos.find(acceso => acceso.nombre_perfil === usuario.perfiles.nombre_perfil);

    // const modulosInactivos = accesoPerfilUsuario.modulosasignados.filter(modulo => modulo.activo === true);

    const payload = {
      sub: usuario.id_usuario,
      username: usuario.usuario,
      role: usuario.perfiles.nombre_perfil,
      id_perfil: usuario.perfiles.id_perfil,
      id_sucursal: usuario.sucursales.id_sucursal,
      sucursal : usuario.sucursales.nombre_sucursal,
      empresa: usuario.sucursales.empresas.nombre_empresa,
      id_empresa: usuario.sucursales.empresas.id_empresa,
      // modulosasignados :modulosInactivos
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN,
      expiresIn: 60 * 60,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN,
      expiresIn: 60 * 60 * 24 * 7,
    });

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }


  async generarToken_Con_REFRESH_TOKEN(
    datoRecibido: RefreshTokenDTO,
  ): Promise<string> {
    try {
      // Verificar si el refresh token es válido
      const payload = await this.jwtService.verifyAsync(
        datoRecibido.refresh_token,
        {
          secret: process.env.REFRESH_TOKEN,
        },
      );

      // Obtener el usuario asociado al refresh token (si es necesario)
      const usuario = await this.usuarioService.obtenerPorID(payload.sub);

      // Crear un nuevo token de acceso con los mismos datos del usuario
      const nuevoAccessToken = await this.jwtService.signAsync(
        {
          sub: usuario.id_usuario,
          username: usuario.usuario,
          role: usuario.perfiles.nombre_perfil,
        },
        {
          secret: process.env.ACCESS_TOKEN,
          expiresIn: 60 * 60, // Otra duración según tus necesidades
        },
      );

      return nuevoAccessToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Manejar el error específico de token expirado
        throw new UnauthorizedException('Refresh token vencido');
      }
      // Manejar el error de verificación del refresh token
      throw new UnauthorizedException('Refresh token no válido');
    }
  }
}
