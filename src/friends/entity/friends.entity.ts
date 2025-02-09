/* eslint-disable prettier/prettier */
import { Status } from 'src/common/enums/status.enum';
import { Users } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friends {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.sentFriendRequests, {
    onDelete: 'CASCADE',
  })
  sender: Users;

  @Column()
  senderName: string;

  @ManyToOne(() => Users, (user) => user.receivedFriendRequests, {
    onDelete: 'CASCADE',
  })
  recipient: Users;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;
}
