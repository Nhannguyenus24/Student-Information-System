import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ThongBaosDocument, ThongBaos } from 'src/schemas/ThongBao.schema';
import { SinhVienService } from 'src/SinhVien/SinhVien.service';
import { GiangVienService } from 'src/GiangVien/GiangVien.service';
import { CreateThongBaoDto } from './dto/addNoti.dto';
import { KhoaHocService } from 'src/KhoaHoc/KhoaHoc.service';

@Injectable()
export class ThongBaoService {
  constructor(
    @InjectModel(ThongBaos.name)
    private readonly thongBaosModel: Model<ThongBaosDocument>,
    private readonly sinhVienService: SinhVienService,
    private readonly giangVienService: GiangVienService,
    private readonly khoaHocService: KhoaHocService,
  ) {}

  async addNoti(
    createThongBaoDto: CreateThongBaoDto,
    user: any,
  ): Promise<ThongBaosDocument> {
    let isAdmin;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user.role === 'admin') {
      isAdmin = true;
    }

    const newThongBao = new this.thongBaosModel(createThongBaoDto);
    const savedThongBao = await newThongBao.save();
    const thongBaoId: Types.ObjectId = savedThongBao._id as Types.ObjectId;

    switch (createThongBaoDto.NhomGui) {
      case 'NienKhoa':
        if (!isAdmin)
          throw new UnauthorizedException('Chỉ admin mới có thể gửi thông báo đến học sinh thuộc khóa này.');
        if (!createThongBaoDto.Khoa) throw new BadRequestException('Thiếu khoa.');
        await this.sinhVienService.addNotiToStudentsInNienKhoa(createThongBaoDto.Khoa, thongBaoId);
        break;
      case 'SinhVien':
        if (!isAdmin)
          throw new UnauthorizedException(
            'Chỉ admin mới có thể gửi thông báo đến tất cả sinh viên.',
          );
        if (createThongBaoDto.KhoaID)
          await this.sinhVienService.addNotiToKhoa(
            createThongBaoDto.KhoaID,
            thongBaoId,
          );
        else await this.sinhVienService.addNotiToAll(thongBaoId);
        break;

      case 'GiangVien':
        if (!isAdmin)
          throw new UnauthorizedException(
            'Chỉ admin mới có thể gửi thông báo đến tất cả giảng viên.',
          );
        if (createThongBaoDto.KhoaID)
          await this.giangVienService.addThongBaoToKhoa(
            createThongBaoDto.KhoaID,
            thongBaoId,
          );
        else await this.giangVienService.addThongBaoToAll(thongBaoId);
        break;

      case 'Khoa':
        if (!isAdmin)
          throw new UnauthorizedException(
            'Chỉ admin mới có thể gửi thông báo đến sinh viên và giáo viên trong khoa.',
          );
        if (!createThongBaoDto.KhoaID) throw new BadRequestException('Thiếu khoa.');
        await Promise.all([
          this.sinhVienService.addNotiToKhoa(
            createThongBaoDto.KhoaID,
            thongBaoId,
          ),
          this.giangVienService.addThongBaoToKhoa(
            createThongBaoDto.KhoaID,
            thongBaoId,
          ),
        ]);
        break;

      case 'KhoaHoc':
        if (!createThongBaoDto.KhoaHocID) {
          throw new BadRequestException('Thiếu khóa học ID.');
        }
        // eslint-disable-next-line no-case-declarations
        const khoaHoc = await this.khoaHocService.getCourseByID(
          createThongBaoDto.KhoaHocID.toString(),
        );
        //const khoaHoc = await this.khoaHocModel.findById(createThongBaoDto.KhoaHocID).exec();
        if (!khoaHoc) throw new BadRequestException('Không tìm thấy khóa học.');

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (user.role === 'teacher' && !isAdmin) {
          const giangVien = await this.giangVienService.getTeacher(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            user.username,
          );
          const giangVienId = giangVien?._id as Types.ObjectId;
          if (
            !khoaHoc.GiangVienID.includes(giangVienId)) {
            throw new UnauthorizedException(
              'Chỉ có thể gửi thông báo cho giảng viên của lớp bạn.',
            );
          }
        }

        await this.sinhVienService.addThongBaoToStudentsInKhoaHoc(
          khoaHoc.SinhVienDangKy,
          thongBaoId,
        );

        if (isAdmin) {
          const lecturerIds = khoaHoc.GiangVienID;
          await this.giangVienService.addThongBaoToLecturersInKhoaHoc(
            lecturerIds,
            thongBaoId,
          );
        }
        break;
    }

    return savedThongBao;
  }

  async getAllNoti(): Promise<ThongBaosDocument[]> {
    return this.thongBaosModel.find().exec();
  }

  async getNotiById(id: string): Promise<ThongBaosDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID thông báo không hợp lệ.');
    }
    const noti = await this.thongBaosModel.findById(id).exec();
    if (!noti) {
      throw new NotFoundException('Không tìm thấy thông báo.');
    }
    return noti;
  }

  async deleteNoti(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID thông báo không hợp lệ.');
    }

    const noti = await this.thongBaosModel.findById(id).exec();
    if (!noti) {
      throw new NotFoundException('Không tìm thấy thông báo để xóa.');
    }

    await Promise.all([
      this.sinhVienService.removeNotiFromAll(id),
      this.giangVienService.removeNotiFromAll(id),
    ]);

    return await this.thongBaosModel.deleteOne({ _id: id }).exec();
  }
}
