import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const sslMode = (
          configService.get<string>('POSTGRES_SSLMODE') || 'disable'
        ).toLowerCase();
        const sslReject = configService.get<string | boolean>(
          'POSTGRES_SSL_REJECT_UNAUTHORIZED',
        );
        const rejectUnauthorized = sslReject === true || sslReject === 'true';
        const ca = configService.get<string>('POSTGRES_SSL_CA');
        const cert = configService.get<string>('POSTGRES_SSL_CERT');
        const key = configService.get<string>('POSTGRES_SSL_KEY');

        let ssl: any = false;
        if (sslMode === 'require' || sslMode === 'prefer') {
          ssl = { rejectUnauthorized: false };
        } else if (sslMode === 'verify-ca' || sslMode === 'verify-full') {
          ssl = { rejectUnauthorized: rejectUnauthorized ?? true } as any;
          if (ca) (ssl as any).ca = ca;
          if (cert) (ssl as any).cert = cert;
          if (key) (ssl as any).key = key;
        }

        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          autoLoadEntities: true,
          synchronize: false, // Use migrations instead
          logging: configService.get('NODE_ENV') === 'development',
          entities: ['dist/entities/*.entity.js'],
          migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
          migrationsRun: false,
          migrationsTableName: 'migrations',
          ssl,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
