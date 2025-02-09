/* eslint-disable prettier/prettier */
import { CalendarData } from 'src/calendar-data/entity/calendar-data.entity';
import { Role } from 'src/common/enums/rol.enum';
import { Friends } from 'src/friends/entity/friends.entity';
import { TrainingList } from 'src/training-list/entity/training-list.entity';
import { UserConfig } from 'src/user-config/entity/user-config.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @ManyToMany(() => TrainingList)
  @JoinTable()
  trainingList: TrainingList[];

  @ManyToMany(() => CalendarData)
  @JoinTable()
  calendarData: CalendarData[];

  @OneToOne(() => UserConfig, (userConfig) => userConfig.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  userConfig?: UserConfig;

  @ManyToMany(() => Users, (user) => user)
  @JoinTable({
    name: 'user_friends',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'friendId', referencedColumnName: 'id' },
  })
  friendList: Users[];

  @OneToMany(() => Friends, (friends) => friends.sender)
  sentFriendRequests: Friends[];

  @OneToMany(() => Friends, (friends) => friends.recipient)
  receivedFriendRequests: Friends[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
