import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class MatrizDTO {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Trim whitespaces at the beginning and end
    @IsNotEmpty({ message: 'El campo nombre_matriz no debe estar vacío' })
    @IsString({ message: 'El campo nombre_matriz tiene que ser una cadena de caracteres' })
    @MaxLength(32 , {message: 'El campo nombre_matriz debe 32 caracteres como maximo'})
    @MinLength(2 , {message: 'El campo nombre_matriz debe 2 caracteres como minimo'})
    nombre_matriz: string;

    @IsNotEmpty({ message: 'El idusuario no debe estar vacío' })
    @IsString({message: "el campo idusuario DEBE MANDARSE EN STRING"})
    @MaxLength(100 , {message: 'El campo idusuario debe 100 caracteres como maximo'})
    @MinLength(1 , {message: 'El campo idusuario debe 1 caracteres como minimo'})
    idusuario:string
}
