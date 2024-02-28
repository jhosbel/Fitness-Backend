import { PartialType } from '@nestjs/swagger';
import { CreateTrainingListDto } from './create-training-list.dto';

export class UpdateTrainingListDto extends PartialType(CreateTrainingListDto) {}
