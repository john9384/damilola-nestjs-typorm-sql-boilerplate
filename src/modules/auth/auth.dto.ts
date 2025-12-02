import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Length, Matches } from 'class-validator';

export class OnboardRequestDto {
  @ApiProperty({
    description: 'Email address for onboarding',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

export class CompleteOnboardRequestDto {
  @ApiProperty({
    description: '6-digit onboarding token',
    example: '123456',
  })
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/, { message: 'Token must be exactly 6 digits' })
  token: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginRequestDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User information',
  })
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
