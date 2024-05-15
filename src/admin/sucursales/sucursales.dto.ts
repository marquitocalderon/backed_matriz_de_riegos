import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostSucursalDto {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo nombre_sucursal no debe estar vacío' })
    @IsString({ message: 'El campo nombre_sucursal tiene que ser una cadena de caracteres' })
    @MaxLength(32 , {message: 'El campo nombre_sucursal debe 32 caracteres como maximo'})
    @MinLength(2 , {message: 'El campo nombre_sucursal debe 2 caracteres como minimo'})
    nombre_sucursal: string;

    @IsNotEmpty({ message: 'El idempresa no debe estar vacío' })
    @IsString({message: "el campo idempresa DEBE MANDARSE EN STRING"})
    @MaxLength(100 , {message: 'El campo idempresa debe 100 caracteres como maximo'})
    @MinLength(1 , {message: 'El campo idempresa debe 1 caracteres como minimo'})
    idempresa:string
}
