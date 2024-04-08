import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;
  @IsString()
  @IsNotEmpty()
  recipientId: string;
  @IsString()
  @IsNotEmpty()
  status: string;
}
