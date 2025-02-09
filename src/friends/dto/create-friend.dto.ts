import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class CreateFriendDto {
  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  senderName: string;

  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
