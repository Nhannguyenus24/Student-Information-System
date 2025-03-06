import { Module } from '@nestjs/common';
import { PhuHuynhService } from './PhuHuynh.service';
import { PhuHuynhController } from './PhuHuynh.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhuHuynh, PhuHuynhSchema } from 'src/schemas/PhuHuynh.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: PhuHuynh.name, schema: PhuHuynhSchema}]),
  ],
  providers: [PhuHuynhService],
  controllers: [PhuHuynhController]
})
export class PhuHuynhModule {}
