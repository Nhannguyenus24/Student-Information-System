import { Module } from '@nestjs/common';
import { KhoaHocService } from './KhoaHoc.service';
import { KhoaHocController } from './KhoaHoc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KhoaHoc, KhoaHocSchema } from 'src/schemas/KhoaHoc.schema';
import { JwtModule } from '@nestjs/jwt';
import { SinhVienModule } from 'src/SinhVien/SinhVien.module';
import { SinhVienService } from 'src/SinhVien/SinhVien.service';
import { GiangVienModule } from 'src/GiangVien/GiangVien.module';
import { GiangVienService } from 'src/GiangVien/GiangVien.service';
import { AuthModule } from 'src/auth/auth.module';
import { TaiLieu, TaiLieuSchema } from 'src/schemas/TaiLieu.schema';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { DanhGiaKhoaHoc, DanhGiaKhoaHocSchema } from 'src/schemas/DanhGiaKhoaHoc.schema';
import { LichHoc, LichHocSchema } from 'src/schemas/LichHoc.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: KhoaHoc.name, schema: KhoaHocSchema}, 
                       {name: TaiLieu.name, schema: TaiLieuSchema},
                       {name: DanhGiaKhoaHoc.name, schema: DanhGiaKhoaHocSchema},
                       {name: LichHoc.name, schema: LichHocSchema}
                      ]),
    JwtModule.register({
              secret: 'abc123',
              signOptions: { expiresIn: '1h' },
            }),
    SinhVienModule,
    GiangVienModule,
    UploadModule,
    AuthModule,
  ],
  providers: [KhoaHocService, SinhVienService, UploadService],
  controllers: [KhoaHocController],
  exports: [MongooseModule, KhoaHocService],
})  
export class KhoaHocModule {}
