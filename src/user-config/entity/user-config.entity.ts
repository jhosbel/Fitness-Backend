import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  age?: string;

  @Column({ default: '' })
  height?: string;

  @Column({ default: '' })
  weight?: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => Users, (user) => user.userConfig)
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
