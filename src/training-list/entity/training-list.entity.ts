import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Entity()
export class TrainingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column('json')
  exercises: {
    id: string;
    name: string;
    muscle: string;
    equipment: string;
    image: string;
    series: number;
    reps: number;
    weightType: string;
    weight: number;
    breakTime: number;
    breakTimeType: string;
    note: string;
  }[];

  @ManyToOne(() => Users, (user) => user.trainingList, { nullable: false })
  user: Users;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userEmail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
