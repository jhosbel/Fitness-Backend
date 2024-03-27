import { Module } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { UserConfigController } from './user-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserConfig, UserConfigSchema } from './schema/user-config.schema';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserConfig.name,
        schema: UserConfigSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [UserConfigController],
  providers: [UserConfigService],
})
export class UserConfigModule {}
