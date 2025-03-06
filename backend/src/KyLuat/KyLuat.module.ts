import { Module } from '@nestjs/common';
import { KyLuatService } from './KyLuat.service';
import { KyLuatController } from './KyLuat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KyLuat, KyLuatSchema } from 'src/schemas/KyLuat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: KyLuat.name, schema: KyLuatSchema}]),
  ],
  providers: [KyLuatService],
  controllers: [KyLuatController]
})
export class KyLuatModule {}
