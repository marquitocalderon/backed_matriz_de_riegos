import { PartialType } from '@nestjs/swagger';
import { CreateIsoDto } from './create-iso.dto';

export class UpdateIsoDto extends PartialType(CreateIsoDto) {}
