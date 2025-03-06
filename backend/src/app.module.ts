import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SinhVienModule } from './SinhVien/SinhVien.module';
import { DiemDanhModule } from './DiemDanh/DiemDanh.module';
import { KiemTraModule } from './KiemTra/KiemTra.module';
import { ThamGiaKiemTraModule } from './ThamGiaKiemTra/ThamGiaKiemTra.module';
import { DiemModule } from './Diem/Diem.module';
import { KyLuatModule } from './KyLuat/KyLuat.module';
import { LichModule } from './Lich/Lich.module';
import { KhoaHocModule } from './KhoaHoc/KhoaHoc.module';
import { GiangVienModule } from './GiangVien/GiangVien.module';
import { HocPhiModule } from './HocPhi/HocPhi.module';
import { PhuHuynhModule } from './PhuHuynh/PhuHuynh.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sis:sis@cluster0.xqphw.mongodb.net/'),
    SinhVienModule,
    DiemDanhModule,
    KiemTraModule,
    ThamGiaKiemTraModule,
    DiemModule,
    KyLuatModule,
    LichModule,
    KhoaHocModule,
    GiangVienModule,
    HocPhiModule,
    PhuHuynhModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
