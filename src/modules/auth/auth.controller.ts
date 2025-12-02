import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  OnboardRequestDto,
  CompleteOnboardRequestDto,
  LoginRequestDto,
  AuthResponseDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start onboarding process' })
  @ApiBody({ type: OnboardRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Onboarding token sent successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Onboarding token sent to your email',
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async onboard(
    @Body() onboardDto: OnboardRequestDto,
  ): Promise<{ message: string }> {
    return await this.authService.onboard(onboardDto.email);
  }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete onboarding process' })
  @ApiBody({ type: CompleteOnboardRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Account created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Account created successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired token',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid onboarding token',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async completeOnboard(
    @Body() completeOnboardDto: CompleteOnboardRequestDto,
  ): Promise<{ message: string }> {
    return await this.authService.completeOnboard(completeOnboardDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many login attempts',
  })
  async login(@Body() loginDto: LoginRequestDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }
}
