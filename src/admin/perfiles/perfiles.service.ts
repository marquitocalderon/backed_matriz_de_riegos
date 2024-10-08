import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfilesEntity } from './perfiles.entity';
import { Repository } from 'typeorm';
import { CrearPerfilDto, UpdatePerfilDTO } from './dto/perfiles.dto';

@Injectable()
export class PerfilesService {

    constructor(@InjectRepository(PerfilesEntity) private perfilRepository: Repository<PerfilesEntity>) {}

   obtenerTodoslosPerfiles(){
      return this.perfilRepository.find({
        relations: ['modulos']
      })
   } 

   async obtenerPorID(id: number) {
    const perfilEncontrado = await this.perfilRepository.findOneBy({
      id_perfil: id,
      estado_perfil: true
    });

    if (!perfilEncontrado) {
      throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!perfilEncontrado.estado_perfil) {
      throw new HttpException('Perfil Eliminado', HttpStatus.NOT_FOUND);
    }

    return perfilEncontrado;
 } 

   async insertarPerfiles(perfil : CrearPerfilDto){

     const PerfilEncontrado = await this.perfilRepository.findOneBy({
      nombre_perfil: perfil.nombre_perfil,
     })

     if (PerfilEncontrado){
      throw new HttpException('perfil ya existe en la base de datos', HttpStatus.CONFLICT)
     }

     await this.perfilRepository.save(PerfilEncontrado)
     return {perfil: "Se guardo Correctamente"}
    }

    async actualizarPerfil(id: number, perfil: UpdatePerfilDTO) {
      const perfilExistente = await this.perfilRepository.findOneBy({
        id_perfil: id,
      });
  
      if (!perfilExistente) {
        throw new HttpException('Perfil no existe', HttpStatus.NOT_FOUND);
      }
  
      // Comprobar la existencia del perfil con el mismo nombre solo si el nombre es diferente
      if (perfil.nombre_perfil !== perfilExistente.nombre_perfil) {
        const perfilConMismoNombre = await this.perfilRepository.findOneBy({
          nombre_perfil: perfil.nombre_perfil,
        });
  
        if (perfilConMismoNombre) {
          throw new HttpException('Perfil con el mismo nombre ya existe', HttpStatus.CONFLICT);
        }
      }
  
      // Actualizar el perfil
      await this.perfilRepository.update(id, perfil);
  
      return { mensaje: 'Se actualizó correctamente' };
    }

    async deletePerfil(id: number) {
      const perfilExistente = await this.perfilRepository.findOneBy({
        id_perfil: id,
        estado_perfil: true
      });
  
      if (!perfilExistente) {
        throw new HttpException('Perfil no encontrado', HttpStatus.NOT_FOUND);
      }

     if (!perfilExistente.estado_perfil) {
      throw new HttpException('Perfil Eliminado', HttpStatus.NOT_FOUND);
    }
  
      // Actualizar el estado del perfil a false
      await this.perfilRepository.update(id, { estado_perfil: false });
  
      return { mensaje: 'Perfil eliminado exitosamente' };
    }
}
