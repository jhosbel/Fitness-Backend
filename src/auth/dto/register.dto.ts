/* eslint-disable prettier/prettier */
import { Role } from 'src/common/enums/rol.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RegisterDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
