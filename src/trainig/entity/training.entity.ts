import { Exercise } from 'src/exercise/entity/exercise.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(() => Exercise)
  @JoinTable()
  exercises: Exercise[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
