import { Module } from '@nestjs/common';
import { DiemSoService } from './DiemSo.service';
import { DiemSoController } from './DiemSo.controller';
import { DiemSo, DiemSoSchema } from 'src/schemas/DiemSo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: DiemSo.name, schema: DiemSoSchema }])],
  providers: [DiemSoService],
  controllers: [DiemSoController]
})
export class DiemSoModule {}
