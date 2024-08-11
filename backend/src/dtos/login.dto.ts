import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';

export class LoginUserDTO {
  @Column({ nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

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
