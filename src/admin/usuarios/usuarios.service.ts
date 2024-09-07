import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';

import { CrearUsuarioDto, UpdateUsuarioDto } from './dto/usuarios.dto';
import * as bcryptjs from 'bcryptjs'
import { PerfilesEntity } from '../perfiles/perfiles.entity';
import { SucursalesEntity } from '../sucursales/sucursales.entity';

// Asegúrate de importar tu entidad PerfilesEntity

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosEntity) private usuarioRepository: Repository<UsuariosEntity>,
    @InjectRepository(PerfilesEntity) private perfilRepository: Repository<PerfilesEntity>,
    @InjectRepository(SucursalesEntity) private sucursalRepository: Repository<SucursalesEntity>,
  ) { }

  obtenerTodosLosUsuarios() {
    return this.usuarioRepository.find({
      order: {
        id_usuario: 'DESC',
      },
      where: {
        estado_usuario: true
      },
    });
  }

  
  buscarParaLogin(usuario: string) {
    return this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
      select:["id_usuario","usuario","password","perfiles", "sucursales"]
    });
  }


  

  async obtenerPorID(id: number) {
    const usuarioEncontrado = await this.usuarioRepository.findOne({
      where: {
        id_usuario: id,
        estado_usuario: true,
      },
      select: ["id_usuario", "usuario", "estado_usuario", "perfiles", "sucursales"], // Lista de campos que deseas seleccionar
    });

    if (!usuarioEncontrado) {
      throw new HttpException('USUARIO no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!usuarioEncontrado.estado_usuario) {
      throw new HttpException('USUARIO Eliminado', HttpStatus.NOT_FOUND);
    }

    return usuarioEncontrado;
  }

  async crearUsuario(usuarioFronted: CrearUsuarioDto, imagen: Express.Multer.File) {
    const sucusalEncontrada = await this.sucursalRepository.findOne({
      where: {
          id_sucursal: parseInt(usuarioFronted.idsucursal, 10),
          estado: true,
      }// Lista de campos que deseas seleccionar
  });

  if (!sucusalEncontrada) {
      throw new HttpException('sucusal no encontrado', HttpStatus.NOT_FOUND);
  }

  if (!sucusalEncontrada.estado) {
      throw new HttpException('sucusal Eliminado', HttpStatus.NOT_FOUND);
  }

    const perfilEncontrado = await this.perfilRepository.findOneBy({
      id_perfil: parseInt(usuarioFronted.idperfil, 10),
      estado_perfil: true,
    });

    if (!perfilEncontrado) {
      throw new HttpException('Perfil no encontrado ', HttpStatus.NOT_FOUND);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      usuario: usuarioFronted.usuario,
    });

    if (usuarioEncontrado) {
      throw new HttpException('Usuario ya existe en la base de datos', HttpStatus.CONFLICT);
    }



    const nuevoUsuarioEntity = this.usuarioRepository.create({
      usuario: usuarioFronted.usuario,
      password: await bcryptjs.hash(usuarioFronted.password, 10),
      perfiles: perfilEncontrado,
      sucursales: sucusalEncontrada
    });

    await this.usuarioRepository.save(nuevoUsuarioEntity);

    return { message: 'Se registró correctamente' };
  }


  async actualizarUsuario(id_usuario: number, datosDelFronted: UpdateUsuarioDto, imagen: Express.Multer.File) {
    const sucusalEncontrada = await this.sucursalRepository.findOne({
      where: {
          id_sucursal: parseInt(datosDelFronted.idsucursal, 10),
          estado: true,
      }// Lista de campos que deseas seleccionar
  });

  if (!sucusalEncontrada) {
      throw new HttpException('sucusal no encontrado', HttpStatus.NOT_FOUND);
  }

  if (!sucusalEncontrada.estado) {
      throw new HttpException('sucusal Eliminado', HttpStatus.NOT_FOUND);
  }
    const perfilEncontrado = await this.perfilRepository.findOneBy({
      id_perfil: parseInt(datosDelFronted.idperfil, 10),
      estado_perfil: true,
    });

    if (!perfilEncontrado) {
      throw new HttpException('Perfil no encontrado ', HttpStatus.NOT_FOUND);
    }


    const usuarioExistente = await this.usuarioRepository.findOneBy({
      id_usuario: id_usuario,
    });

    if (!usuarioExistente) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      usuario: datosDelFronted.usuario,
    });

    // Verifica si el usuario con el nuevo nombre ya existe, excluyendo al usuario actual
    if (usuarioEncontrado && usuarioEncontrado.id_usuario !== id_usuario) {
      throw new HttpException('Usuario ya existe en la base de datos', HttpStatus.CONFLICT);
    }

    // Verifica si el nombre de usuario se ha cambiado antes de comparar con otros usuarios
    if (datosDelFronted.usuario !== usuarioExistente.usuario) {
      const usuarioConMismoNombre = await this.usuarioRepository.findOneBy({
        usuario: datosDelFronted.usuario,
      });

      if (usuarioConMismoNombre) {
        throw new HttpException('Usuario con el mismo nombre ya existe', HttpStatus.CONFLICT);
      }
    }



   


    // Verifica si se proporciona una nueva contraseña
    let nuevaContraseñaHash: string | null = null;

    if (datosDelFronted.password && datosDelFronted.password.length > 0) {
      // Hash de la nueva contraseña
      nuevaContraseñaHash = await bcryptjs.hash(datosDelFronted.password, 10);
    }

  
    const nuevoUsuarioEntity = this.usuarioRepository.create({
      usuario: datosDelFronted.usuario,
      password: nuevaContraseñaHash ? nuevaContraseñaHash : usuarioExistente.password,
      perfiles: perfilEncontrado,
      sucursales: sucusalEncontrada
  });



    await this.usuarioRepository.update(id_usuario, nuevoUsuarioEntity);

    return { message: 'Actualización exitosa' };
  }


}
