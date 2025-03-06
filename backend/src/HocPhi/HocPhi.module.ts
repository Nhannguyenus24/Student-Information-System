import { Module } from '@nestjs/common';
import { HocPhiService } from './HocPhi.service';
import { HocPhiController } from './HocPhi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HocPhi, HocPhiSchema } from 'src/schemas/HocPhi.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: HocPhi.name, schema: HocPhiSchema }])
  ],
  providers: [HocPhiService],
  controllers: [HocPhiController]
})
export class HocPhiModule {}
