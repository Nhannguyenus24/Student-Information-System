import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { GiangVien, GiangVienDocument } from 'src/schemas/GiangVien.schema';
import { UpdateGiangVienDto } from './dto/update-giangvien.dto';
import { GetTeacherListDto } from './dto/getListGiangVien.dto';

@Injectable()
export class GiangVienService {
  uploadService: any;
  constructor(
    @InjectModel(GiangVien.name)
    private readonly giangVienModel: Model<GiangVienDocument>,
    private readonly authService: AuthService,
  ) {}

  async getAll() {
    return await this.giangVienModel.find().exec();
  }

  async getTeacher(MaGV: string) {
    const giangVien = await this.giangVienModel
      .findOne({ MaGV })
      .populate('KhoaID', 'TenKhoa')
      .exec();
    return giangVien;
  }

  async getTeacherList(query: GetTeacherListDto) {
    const { pageSize, pageNumber, sortBy, sortOrder } = query;

    if (!pageSize || !pageNumber || !sortBy || !sortOrder)
      throw new BadRequestException('Thiếu các trường cần thiết');

    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1; // 1  ascending, -1  descending

    const giangViens = await this.giangVienModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort(sort);

    return {
      pageSize,
      pageNumber,
      total: await this.giangVienModel.countDocuments(),
      data: giangViens,
    };
  }

  async addTeacher(
    MaGV: string,
    HoTen: string,
    ChucVu: string,
    KhoaID: string,
  ): Promise<GiangVien> {
    const newTeacher = new this.giangVienModel({
      MaGV,
      HoTen,
      NgaySinh: null,
      GioiTinh: null,
      DiaChi: null,
      SoDienThoai: null,
      ChucVu,
      Khoa: null,
      CCCD: null,
      TrinhDo: null,
      KhoaID,
      NgayVaoLam: Date.now(),
    });
    return newTeacher.save();
  }

  private removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  async generateUsername(fullName: string): Promise<string> {
    const normalizedFullName = this.removeDiacritics(fullName);
    const nameParts = normalizedFullName.trim().split(' ');
    const lastName = nameParts.pop();
    const initials = nameParts
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    const count = await this.giangVienModel.countDocuments();
    const username = `${initials}${lastName}${(count + 1).toString().padStart(4, '0')}`;
    return username;
  }

  async deleteTeacher(MaGV: string): Promise<void> {
    try {
      const giangVien = await this.giangVienModel.findOne({ MaGV });
      if (!giangVien) {
        throw new NotFoundException('Giảng viên không tồn tại.');
      }
      console.log(giangVien);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = await this.authService.deleteAccountByUsername(MaGV);
      await this.giangVienModel.findByIdAndDelete(giangVien._id);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Xóa giảng viên thất bại: ${error.message}`);
    }
  }

  // async getFaculty()
  async updateTeacher(MaGV: string, updateGiangVienDto: UpdateGiangVienDto) {
    const giangVien = await this.giangVienModel.findOne({ MaGV });
    if (!giangVien) {
      throw new NotFoundException('Giảng viên không tồn tại');
    }

    if (updateGiangVienDto.CCCD) {
      const existingCCCD = await this.giangVienModel.findOne({
        CCCD: updateGiangVienDto.CCCD,
      });
      if (existingCCCD && existingCCCD.MaGV !== MaGV) {
        throw new BadRequestException('CCCD đã tồn tại');
      }
    }

    if (updateGiangVienDto.SoDienThoai) {
      const existingSDT = await this.giangVienModel.findOne({
        SoDienThoai: updateGiangVienDto.SoDienThoai,
      });
      if (existingSDT && existingSDT.MaGV !== MaGV) {
        throw new BadRequestException('Số điện thoại đã tồn tại');
      }
    }
    const updatedGiangVien = await this.giangVienModel.findOneAndUpdate(
      { MaGV },
      { $set: updateGiangVienDto, NgayCapNhat: new Date() },
      { new: true },
    );

    return updatedGiangVien;
  }

  async searchTeacher(query: string) {
    const giangVien = await this.giangVienModel.find({
      $or: [
        { HoTen: { $regex: query, $options: 'i' } },
        { MaGV: { $regex: query, $options: 'i' } },
      ],
    });
    if (giangVien.length === 0)
      throw new NotFoundException('Không tìm thấy giảng viên.');

    return giangVien;
  }

  async addThongBaoToAll(thongBaoId: Types.ObjectId): Promise<void> {
    await this.giangVienModel.updateMany(
      {},
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async addThongBaoToKhoa(
    khoaId: Types.ObjectId,
    thongBaoId: Types.ObjectId,
  ): Promise<void> {
    await this.giangVienModel.updateMany(
      { KhoaID: khoaId },
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async addThongBaoToLecturersInKhoaHoc(
    lecturerIds: Types.ObjectId[],
    thongBaoId: Types.ObjectId,
  ): Promise<void> {
    await this.giangVienModel.updateMany(
      { _id: { $in: lecturerIds } },
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async removeNotiFromAll(thongBaoId: string): Promise<void> {
    await this.giangVienModel.updateMany(
      {},
      { $pull: { ThongBao: { thongBaoId: new Types.ObjectId(thongBaoId) } } },
    );
  }

  async getTeacherNoti(MaGV: string) {
    const giangVien = await this.giangVienModel
      .findOne({ MaGV })
      .populate('ThongBao.thongBaoId')
      .exec();
    if (!giangVien) {
      throw new NotFoundException('Không tìm thấy giảng viên.');
    }
    return giangVien.ThongBao || [];
  }

  async markNotiAsRead(MaGV: string, thongBaoId: string): Promise<GiangVienDocument> {
    const giangVien = await this.giangVienModel.findOne({ MaGV });
    if (!giangVien) {
      throw new NotFoundException('Không tìm thấy giảng viên.');
    }
  
    const thongBaoExists = giangVien.ThongBao.some(
      (noti) => noti.thongBaoId.toString() === thongBaoId,
    );
    if (!thongBaoExists) {
      throw new NotFoundException('Thông báo không tồn tại trong danh sách của giảng viên.');
    }
  
    const updatedGiangVien = await this.giangVienModel.findOneAndUpdate(
      { MaGV, 'ThongBao.thongBaoId': new Types.ObjectId(thongBaoId) },
      { $set: { 'ThongBao.$.isRead': true } },
      { new: true },
    );
  
    if (!updatedGiangVien) {
      throw new NotFoundException('Không thể cập nhật giảng viên.');
    }
  
    return updatedGiangVien;
  }


}
