import { IsNotEmpty, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PermisosModuloDTO {
  @IsNotEmpty()
  @IsNumber()
  id_perfil: number;

  @IsNotEmpty()
  @IsNumber()
  id_modulo: number;

  @IsNotEmpty()
  @IsBoolean()
  activo: boolean;
}

export class CrearPermisosDTO {
  @ValidateNested({ each: true })
  @Type(() => PermisosModuloDTO)
  @IsNotEmpty()
  permisosmodulos: PermisosModuloDTO[];
}
