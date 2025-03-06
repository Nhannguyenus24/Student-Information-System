import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NguoiDung, NguoiDungSchema } from 'src/schemas/NguoiDung.schem';

@Module({
  imports: [
    MongooseModule.forFeature([{name: NguoiDung.name, schema: NguoiDungSchema}]),
  ],
  providers: [NguoiDungService],
  controllers: [NguoiDungController]
})
export class NguoiDungModule {}
