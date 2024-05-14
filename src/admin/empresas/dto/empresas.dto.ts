import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostEmpresaDto {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo nombre_empresa no debe estar vacío' })
    @IsString({ message: 'El campo nombre_empresa tiene que ser una cadena de caracteres' })
    @MaxLength(40 , {message: 'El campo nombre_empresa debe 40 caracteres como maximo'})
    @MinLength(2 , {message: 'El campo nombre_empresa debe 2 caracteres como minimo'})
    nombre_empresa: string;


}
