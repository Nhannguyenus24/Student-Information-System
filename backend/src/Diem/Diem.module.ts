import { Module } from '@nestjs/common';
import { DiemService } from './Diem.service';
import { DiemController } from './Diem.controller';
import { Diem, DiemSchema } from 'src/schemas/Diem.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Diem.name, schema: DiemSchema }])],
  providers: [DiemService],
  controllers: [DiemController]
})
export class DiemModule {}
