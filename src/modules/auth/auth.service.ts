import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserEntity } from '../../database/entities';
import {
  AuthResponseDto,
  CompleteOnboardRequestDto,
  JwtPayload,
  LoginRequestDto,
} from '../../types';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async onboard(email: string): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return { message: 'Onboarding token sent to your email' };
  }

  async completeOnboard(
    completeOnboardDto: CompleteOnboardRequestDto,
  ): Promise<{ message: string }> {
    const { token, firstName, lastName, password } = completeOnboardDto;
    console.log(token, firstName, lastName, password);
    await this.userRepository.createUser({
      email: '',
      password,
      name: `${firstName} ${lastName}`,
    });
    return { message: 'Account created successfully' };
  }

  async login(loginDto: LoginRequestDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    console.log(email, password);
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: '1234567890',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
      },
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async validateUserCredentials(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }
}
