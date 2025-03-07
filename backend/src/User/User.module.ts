import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schem';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
