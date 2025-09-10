import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDate, IsEmail, IsIn, IsString, Length } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(2, 200)
  @Column({
    length: 200
  })
  fullName: string;

  @IsDate()
  @Column()
  dateOfBirth: Date;

  @IsEmail()
  @Column({
    unique: true,
    select: false
  })
  email: string;

  @IsString()
  @Column({
    select: false
  })
  password: string;

  @IsIn(['admin', 'user'])
  @Column({
    default: 'user'
  })
  role: 'admin' | 'user';

  @IsBoolean()
  @Column({
    default: true
  })
  isActive: boolean;
}
