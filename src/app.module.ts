import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { TrainigModule } from './trainig/training.module';
import { TrainingListModule } from './training-list/training-list.module';
import { CalendarDataModule } from './calendar-data/calendar-data.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
//import { ConfigModule } from '@nestjs/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserConfigModule } from './user-config/user-config.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationModule } from './notification/notification.module';
import { GatewayModule } from './websockets/websocket.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    //TypeOrmModule.forRoot({
    //  type: 'postgres',
    //  host: 'localhost',
    //  port: 5060,
    //  username: 'root',
    //  password: 'root321',
    //  database: 'C-Fitness-DB',
    //  entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //  synchronize: true,
    //}),
    ExerciseModule,
    TrainigModule,
    TrainingListModule,
    CalendarDataModule,
    UsersModule,
    AuthModule,
    UserConfigModule,
    FriendsModule,
    NotificationModule,
    GatewayModule,
  ],
})
export class AppModule {}
