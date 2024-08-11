import { IsString, IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class RegisterUserDTO {

  @Column({ nullable: false })
  @IsString()
  username: string;

  @Column({ nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

  // Getter pentru username
  getUsername(): string {
    return this.username;
  }

  // Setter pentru username
  setUsername(username: string): void {
    this.username = username;
  }

  // Getter pentru email
  getEmail(): string {
    return this.email;
  }

  // Setter pentru email
  setEmail(email: string): void {
    this.email = email;
  }

  // Getter pentru password
  getPassword(): string {
    return this.password;
  }

  // Setter pentru password
  setPassword(password: string): void {
    this.password = password;
  }
}
