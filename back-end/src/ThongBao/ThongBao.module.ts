import { Module } from '@nestjs/common';
import { ThongBaoService } from './ThongBao.service';
import { ThongBaoController } from './ThongBao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThongBaos, ThongBaosSchema } from 'src/schemas/ThongBao.schema';
import { SinhVienService } from 'src/SinhVien/SinhVien.service';
import { GiangVienService } from 'src/GiangVien/GiangVien.service';
import { SinhVienModule } from 'src/SinhVien/SinhVien.module';
import { GiangVienModule } from 'src/GiangVien/GiangVien.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { KhoaHoc, KhoaHocSchema } from 'src/schemas/KhoaHoc.schema';
import { KhoaHocService } from 'src/KhoaHoc/KhoaHoc.service';
import { TaiLieu, TaiLieuSchema } from 'src/schemas/TaiLieu.schema';
import { UploadService } from 'src/upload/upload.service';
import { DanhGiaKhoaHoc } from 'src/schemas/DanhGiaKhoaHoc.schema';
import { KhoaHocModule } from 'src/KhoaHoc/KhoaHoc.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ThongBaos.name, schema: ThongBaosSchema },
      { name: TaiLieu.name, schema: TaiLieuSchema },
    ]),
    SinhVienModule,
    GiangVienModule,
    AuthModule,
    KhoaHocModule,
    // UploadModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    ThongBaoService,
    SinhVienService,
    GiangVienService,
    KhoaHocService,
    UploadService,
  ],
  controllers: [ThongBaoController],
})
export class ThongBaosModule {}
