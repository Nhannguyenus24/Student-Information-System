import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Khoa, KhoaSchema } from 'src/schemas/Khoa.schema';
import { JwtModule } from '@nestjs/jwt';
import { KhoaController } from './Khoa.controller';
import { KhoaService } from './Khoa.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Khoa.name, schema: KhoaSchema }]),
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [KhoaService],
  controllers: [KhoaController],
  exports: [MongooseModule],
})
export class KhoaModule {}
