// stripe.dto.ts

import { IsArray, ValidateNested, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoDTO {
  @IsString()
  nombre_producto: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(1)
  cantidad: number;
}

export class StripeDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoDTO)
  productos: ProductoDTO[];
}
