import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SinhVienModule } from './SinhVien/SinhVien.module';
import { GiangVienModule } from './GiangVien/GiangVien.module';
import { KyLuatModule } from './KyLuat/KyLuat.module';
import { PhuHuynhModule } from './PhuHuynh/PhuHuynh.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { ThongBaosModule } from './ThongBao/ThongBao.module';
import { LichHocModule } from './LichHoc/LichHoc.module';
import { KhoaHocModule } from './KhoaHoc/KhoaHoc.module';
import { HocPhiModule } from './HocPhi/HocPhi.module';
import { BaiKiemTraModule } from './BaiKiemTra/BaiKiemTra.module';
import { DiemDanhModule } from './DiemDanh/DiemDanh.module';
import { DiemSoModule } from './DiemSo/DiemSo.module';
import { KhoaModule } from './Khoa/Khoa.module';

@Module({
  imports: [
      // MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forRoot(
      'mongodb+srv://sis:sis@cluster0.xqphw.mongodb.net/',
    ),
    // AzureStorageModule.withConfig({
    //   sasKey: process.env.AZURE_STORAGE_SAS_KEY,
    //   accountName: process.env.AZURE_STORAGE_ACCOUNT,
    //   containerName: 'course-documents',
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    AuthModule,
    SinhVienModule,
    GiangVienModule,
    KyLuatModule,
    PhuHuynhModule,
    ThongBaosModule,
    LichHocModule,
    KhoaHocModule,
    HocPhiModule,
    BaiKiemTraModule,
    KhoaModule,
    DiemDanhModule,
    DiemSoModule,
  ],
})
export class AppModule {}
