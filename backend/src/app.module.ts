import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SinhVienModule } from './SinhVien/SinhVien.module';
import { DiemDanhModule } from './DiemDanh/DiemDanh.module';
import { BaiKiemTraModule } from './BaiKiemTra/BaiKiemTra.module';
import { ThamGiaLamBaiModule } from './ThamGiaLamBai/ThamGiaLamBai.module';
import { DiemSoModule } from './DiemSo/DiemSo.module';
import { KyLuatModule } from './KyLuat/KyLuat.module';
import { LichHocModule } from './LichHoc/LichHoc.module';
import { KhoaHocModule } from './KhoaHoc/KhoaHoc.module';
import { GiangVienModule } from './GiangVien/GiangVien.module';
import { HocPhiModule } from './HocPhi/HocPhi.module';
import { PhuHuynhModule } from './PhuHuynh/PhuHuynh.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sis:sis@cluster0.xqphw.mongodb.net/'),
    SinhVienModule,
    DiemDanhModule,
    BaiKiemTraModule,
    ThamGiaLamBaiModule,
    DiemSoModule,
    KyLuatModule,
    LichHocModule,
    KhoaHocModule,
    GiangVienModule,
    HocPhiModule,
    PhuHuynhModule,
    NguoiDungModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
