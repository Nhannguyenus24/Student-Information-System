import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaiLieu, TaiLieuSchema } from 'src/schemas/TaiLieu.schema';
import { KhoaHoc, KhoaHocSchema } from 'src/schemas/KhoaHoc.schema';
import { JwtModule } from '@nestjs/jwt';
import { GiangVien, GiangVienSchema } from 'src/schemas/GiangVien.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: TaiLieu.name, schema: TaiLieuSchema}, 
      { name: KhoaHoc.name, schema: KhoaHocSchema },
      {name: GiangVien.name, schema: GiangVienSchema},
    ]),
    JwtModule.register({
                  secret: 'abc123',
                  signOptions: { expiresIn: '1h' },
                }),
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}