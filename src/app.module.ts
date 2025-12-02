import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/typeorm.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventsModule } from './modules/events/events.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { validationSchema } from './config/validation.schema';
import appConfig from './config/app.config';
import databaseConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EventsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
