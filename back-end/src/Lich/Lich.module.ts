import { forwardRef, Module } from '@nestjs/common';
import { LichService } from './Lich.service';
import { LichController } from './Lich.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lich, LichSchema } from 'src/schemas/Lich.schema';
import { AuthModule } from 'src/auth/auth.module';
import { SinhVienModule } from 'src/SinhVien/SinhVien.module';
import { JwtModule } from '@nestjs/jwt';
import { KhoaHocModule } from 'src/KhoaHoc/KhoaHoc.module';
import { BaiKiemTraModule } from 'src/BaiKiemTra/BaiKiemTra.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lich.name, schema: LichSchema }]),
    AuthModule,
    forwardRef(() => SinhVienModule),
    KhoaHocModule,
    BaiKiemTraModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LichService],
  controllers: [LichController],
  exports: [MongooseModule],
})
export class LichModule {}
