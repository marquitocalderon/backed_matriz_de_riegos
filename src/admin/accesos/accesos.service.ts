import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccesoEntity } from './accesos.entity';
import { PerfilesEntity } from '../perfiles/perfiles.entity';
import { ModuloEntity } from '../modulos/modulos.entity';
import { CrearPermisosDTO } from './dto/accesos.dto.entity';

@Injectable()
export class AccesosService {
  constructor(
    @InjectRepository(AccesoEntity)
    private accesoRepository: Repository<AccesoEntity>,
    @InjectRepository(PerfilesEntity)
    private PerfilEntity: Repository<PerfilesEntity>,
    @InjectRepository(ModuloEntity)
    private ModuloEntity: Repository<ModuloEntity>,
  ) {}

  async obtenerDatos() {
    // Obtener todos los accesos
    const accesos = await this.accesoRepository.find({
      relations: ['perfiles', 'modulos'],
    });

    // Objeto para almacenar los datos agrupados por perfil
    const datosAgrupados = {};

    // Iterar sobre los accesos para agruparlos por perfil
    accesos.forEach(acceso => {
      const id_perfil = acceso.perfiles.id_perfil;
      const perfil = acceso.perfiles.nombre_perfil;
      const modulo = {
        id_modulo: acceso.modulos.id_modulo,
        modulo: acceso.modulos.modulo,
        activo: acceso.activo // Usar el estado activo del acceso
      };

      if (!datosAgrupados[perfil]) {
        datosAgrupados[perfil] = {
          id_perfil: id_perfil, // Agregar id_perfil
          modulos: [] // Crear un arreglo para los módulos
        };
      }

      datosAgrupados[perfil].modulos.push(modulo); // Agregar el módulo al arreglo correspondiente
    });

    // Crear el resultado en el formato deseado
    const resultado = Object.keys(datosAgrupados).map(perfil => ({
      id_perfil: datosAgrupados[perfil].id_perfil, // Incluir id_perfil
      nombre_perfil: perfil,
      modulosasignados: datosAgrupados[perfil].modulos.map(modulo => ({
        id_modulo: modulo.id_modulo,
        modulo: modulo.modulo,
        activo: modulo.activo
      })),
    }));

    return resultado;
}



async postPermisoDatos(permisosModulo: CrearPermisosDTO) {
    let errores: string[] = [];

  
  
    // Validar si existen permisos existentes para los perfiles y módulos proporcionados
    for (const permiso of permisosModulo.permisosmodulos) {
        const { id_perfil, id_modulo } = permiso;

        // Verificar si el perfil y el módulo existen en la base de datos
        const perfilExistente = await this.PerfilEntity.findOne({
            where: {
                id_perfil: id_perfil
            }
        })
        const moduloExistente = await this.ModuloEntity.findOne({
            where: {
                id_modulo: id_modulo
            }
        })

        if (!perfilExistente) {
          throw new HttpException(
            `Error not founD EL ID PERFIL`,
            HttpStatus.NOT_FOUND,
          );
        }

        if (!moduloExistente) {
          throw new HttpException(
            `Error not fount ID MODULO`,
            HttpStatus.NOT_FOUND,
          );
        }

          // Verificar si ya existe el permiso de datos para este perfil y módulo
          const permisoExistente = await this.accesoRepository.findOne({
            where: {
                perfiles: perfilExistente,
                modulos: moduloExistente
            }
        });

        if (permisoExistente) {
          throw new HttpException(
            `Error PERMISOS YA CREADOS`,
            HttpStatus.CONFLICT,
          );
        }
    }

    // Si se encontraron errores, devolver un estado de conflicto
    if (errores.length > 0) {
        return {
            status: HttpStatus.CONFLICT,
            message: 'Hubo errores al crear algunos permisos',
            errors: errores
        };
    }

    // Crear los nuevos permisos
    for (const permiso of permisosModulo.permisosmodulos) {
        const { id_perfil, id_modulo, activo } = permiso;
        const nuevoPermiso = this.accesoRepository.create({
            perfiles: await this.PerfilEntity.findOne({
                where: {
                    id_perfil: id_perfil
                }
            }),
            modulos: await this.ModuloEntity.findOne({
                where: {
                    id_modulo: id_modulo
                }
            }),
            activo: activo,
        });
        await this.accesoRepository.save(nuevoPermiso);
    }
    
    // Si no hubo errores, devolver un estado 200 OK con un mensaje de éxito
    return {
        status: HttpStatus.OK,
        message: 'Permisos creados correctamente'
    };
}
  
  

  async putPermisoDatos(permisosModulo: CrearPermisosDTO) {
    let errores: string[] = [];

    // Verificar si hay algún error en los permisos proporcionados
    for (const permiso of permisosModulo.permisosmodulos) {
      const { id_perfil, id_modulo } = permiso;
      const existente = await this.accesoRepository.findOne({
        where: {
          perfiles: { id_perfil: id_perfil },
          modulos: { id_modulo: id_modulo },
        },
      });

      if (!existente) {
        errores.push(`No se encontró el permiso para el perfil ${id_perfil} y el módulo ${id_modulo}`);
      }
    }

    // Si se encontraron errores, lanzar una excepción
    if (errores.length > 0) {
      throw new HttpException(
        `Hubo errores al actualizar algunos permisos: ${errores.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Actualizar los permisos
    for (const permiso of permisosModulo.permisosmodulos) {
      const { id_perfil, id_modulo, activo } = permiso;
      await this.accesoRepository.update(
        { perfiles: { id_perfil: id_perfil }, modulos: { id_modulo: id_modulo } },
        { activo },
      );
    }
   // Si no hubo errores, devolver un estado 200 OK con un mensaje de éxito
   return {
    status: HttpStatus.OK,
    message: 'Permisos actualizados correctamente'
};
  }
}
