import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  //JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CalendarData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  start: string;

  @Column({ nullable: true })
  trainingListId: string;

  @ManyToOne(() => Users, (user) => user.calendarData, {
    nullable: false,
  })
  //@JoinColumn({ name: 'userId' })
  user: Users;

  /* @Column()
  userEmail: string; */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
