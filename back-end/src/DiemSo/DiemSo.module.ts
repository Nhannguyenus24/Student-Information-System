import { Module } from '@nestjs/common';
import { DiemSoService } from './DiemSo.service';
import { DiemSoController } from './DiemSo.controller';
import { DiemSo, DiemSoSchema } from 'src/schemas/DiemSo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SinhVienModule } from 'src/SinhVien/SinhVien.module';
import { KhoaHocModule } from 'src/KhoaHoc/KhoaHoc.module';
import { GiangVienModule } from 'src/GiangVien/GiangVien.module';
import { BaiKiemTraModule } from 'src/BaiKiemTra/BaiKiemTra.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DiemSo.name, schema: DiemSoSchema }]),
    AuthModule,
    SinhVienModule,
    DiemSoModule,
    KhoaHocModule,
    GiangVienModule,
    BaiKiemTraModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [DiemSoService],
  controllers: [DiemSoController],
  exports: [MongooseModule],
})
export class DiemSoModule {}
