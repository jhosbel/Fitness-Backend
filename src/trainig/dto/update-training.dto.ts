import { PartialType } from '@nestjs/swagger';
import { CreateTrainigDto } from './create-training.dto';

export class UpdateTrainigDto extends PartialType(CreateTrainigDto) {}
