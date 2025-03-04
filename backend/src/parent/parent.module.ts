import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from 'src/schemas/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Parent.name, schema: ParentSchema}]),
  ],
  providers: [ParentService],
  controllers: [ParentController]
})
export class ParentModule {}
