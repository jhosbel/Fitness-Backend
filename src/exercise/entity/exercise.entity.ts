import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  muscle: string;

  @Column()
  equipment: string;

  @Column()
  instructions: string;

  @Column()
  image: string;
}
