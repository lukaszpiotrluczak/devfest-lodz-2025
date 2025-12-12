import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  topic?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  message: string;

  // Honeypot field (should be empty)
  @IsOptional()
  @IsString()
  company?: string;
}
