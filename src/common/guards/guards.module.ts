import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [PassportModule],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class GuardsModule {}
