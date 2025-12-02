export interface AuthToken {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface OnboardRequestDto {
  email: string;
}

export interface CompleteOnboardRequestDto {
  token: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
}
