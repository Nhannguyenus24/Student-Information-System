import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SinhVien, SinhVienDocument } from '../schemas/SinhVien.schema';
import { CreateSinhVienDto } from './dto/create-sinhvien.dto';
import { UpdateSinhVienDto } from './dto/update-sinhvien.dto';
import { GetListStudentDto } from './dto/getList-sinhvien.dto';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SinhVienService {
  constructor(
    @InjectModel(SinhVien.name) private sinhVienModel: Model<SinhVienDocument>,
    private readonly authService: AuthService,
  ) {}

  async addStudent(createSinhVienDto: CreateSinhVienDto): Promise<SinhVien> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...sinhVienData } = createSinhVienDto;
    const newStudent = new this.sinhVienModel({
      ...sinhVienData,
      NgaySinh: null,
      GioiTinh: null,
      DiaChi: null,
      SoDienThoai: null,
      Khoa: null,
      CCCD: null,
      Anh: null,
      TrangThai: 'Studying',
    });

    return newStudent.save();
  }

  async importExcel(file: Express.Multer.File): Promise<string> {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);

    for (const sinhVienData of data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const username = sinhVienData.mssv.toString();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const email = `${sinhVienData.mssv}@student.hcmus.edu.vn`;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const password = sinhVienData.mssv.toString();
      const role = 'Student';
      console.log(password);
      await this.authService.register(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        username,
        email,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        password,
        role,
      );

      const sinhVien = new this.sinhVienModel({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        mssv: sinhVienData.mssv,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        HoTen: sinhVienData.HoTen,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        NgaySinh: sinhVienData.NgaySinh
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            new Date(sinhVienData.NgaySinh)
          : null,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        GioiTinh: sinhVienData.GioiTinh,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        DiaChi: sinhVienData.DiaChi,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        SoDienThoai: sinhVienData.SoDienThoai,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        KhoaID: sinhVienData.KhoaID,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        CCCD: sinhVienData.CCCD,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        Anh: sinhVienData.Anh,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        TrangThai: sinhVienData.TrangThai,
        ThoiGianCapNhat: new Date(),
      });

      await sinhVien.save(); // Lưu sinh viên vào MongoDB
    }

    return 'File imported successfully!';
  }
  async updateStudent(
    mssv: string,
    updateSinhVienDto: UpdateSinhVienDto,
  ): Promise<SinhVien> {
    const student = await this.sinhVienModel.findOne({ mssv });
    if (!student) {
      throw new NotFoundException('Sinh viên không tồn tại');
    }

    if (updateSinhVienDto.CCCD) {
      const existingCCCD = await this.sinhVienModel.findOne({
        CCCD: updateSinhVienDto.CCCD,
      });
      if (existingCCCD && existingCCCD.mssv !== mssv) {
        throw new BadRequestException('CCCD đã tồn tại');
      }
    }

    if (updateSinhVienDto.SoDienThoai) {
      const existingSDT = await this.sinhVienModel.findOne({
        SoDienThoai: updateSinhVienDto.SoDienThoai,
      });
      if (existingSDT && existingSDT.mssv !== mssv) {
        throw new BadRequestException('Số điện thoại đã tồn tại');
      }
    }

    delete updateSinhVienDto['mssv'];
    delete updateSinhVienDto['HoTen'];
    Object.assign(student, updateSinhVienDto, { ThoiGianCapNhat: new Date() });
    return student.save();
  }

  async deleteStudentByMSSV(mssv: string) {
    const student = await this.sinhVienModel.findOne({ mssv });

    if (!student) {
      throw new NotFoundException(`Không tìm thấy sinh viên có MSSV: ${mssv}`);
    }
    await this.sinhVienModel.deleteOne({ mssv });
  }
  async getStudentByMSSV(mssv: string): Promise<SinhVien> {
    const student = await this.sinhVienModel
      .findOne({ mssv })
      .populate('KhoaID', 'TenKhoa')
      .exec();
    if (!student) {
      throw new NotFoundException('Sinh viên không tồn tại');
    }
    return student;
  }

  async searchSinhVien(query: string) {
    const sinhVien = await this.sinhVienModel.find({
      $or: [
        { HoTen: { $regex: query, $options: 'i' } },
        { mssv: { $regex: query, $options: 'i' } },
      ],
    });
    if (sinhVien.length === 0) {
      throw new NotFoundException('Không tìm thấy sinh viên.');
    }

    return sinhVien;
  }

  async getListStudent(query: GetListStudentDto) {
    const { pageSize, pageNumber, sortBy, sortOrder } = query;

    if (!pageSize || !pageNumber || !sortBy || !sortOrder) {
      throw new BadRequestException('Thiếu các trường cần thiết');
    }

    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const sinhViens = await this.sinhVienModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort(sort);

    return {
      pageSize,
      pageNumber,
      total: await this.sinhVienModel.countDocuments(),
      data: sinhViens,
    };
  }

  async addNotiToAll(thongBaoId: Types.ObjectId): Promise<void> {
    await this.sinhVienModel.updateMany(
      {},
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async addNotiToKhoa(
    khoaId: Types.ObjectId,
    thongBaoId: Types.ObjectId,
  ): Promise<void> {
    await this.sinhVienModel.updateMany(
      { KhoaID: khoaId },
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async addThongBaoToStudentsInKhoaHoc(
    studentIds: Types.ObjectId[],
    thongBaoId: Types.ObjectId,
  ): Promise<void> {
    await this.sinhVienModel.updateMany(
      { _id: { $in: studentIds } },
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async addNotiToStudentsInNienKhoa(
    NienKhoa: string,
    thongBaoId: Types.ObjectId,
  ): Promise<void> {
    await this.sinhVienModel.updateMany(
      { Khoa: NienKhoa },
      { $push: { ThongBao: { thongBaoId, isRead: false } } },
    );
  }

  async removeNotiFromAll(thongBaoId: string): Promise<void> {
    await this.sinhVienModel.updateMany(
      {},
      { $pull: { ThongBao: { thongBaoId: new Types.ObjectId(thongBaoId) } } },
    );
  }

  async getStudentNoti(MSSV: string) {
    console.log(MSSV);
    const sinhVien = await this.sinhVienModel
      .findOne({ mssv: MSSV })
      .populate('ThongBao.thongBaoId')
      .exec();
    if (!sinhVien) {
      throw new NotFoundException('Không tìm thấy sinh viên.');
    }
    return sinhVien.ThongBao || [];
  }

  async markNotiAsRead(mssv: string, thongBaoId: string): Promise<SinhVienDocument> {
    const sinhVien = await this.sinhVienModel.findOne({ mssv });
    if (!sinhVien) {
      throw new NotFoundException('Không tìm thấy sinh viên.');
    }
  
    const thongBaoExists = sinhVien.ThongBao.some(
      (noti) => noti.thongBaoId.toString() === thongBaoId,
    );
    if (!thongBaoExists) {
      throw new NotFoundException('Thông báo không tồn tại trong danh sách của sinh viên.');
    }
  
    const updatedSinhVien = await this.sinhVienModel.findOneAndUpdate(
      { mssv, 'ThongBao.thongBaoId': new Types.ObjectId(thongBaoId) },
      { $set: { 'ThongBao.$.isRead': true } },
      { new: true },
    ).exec();
    if (!updatedSinhVien) {
      throw new NotFoundException('Không thể cập nhật sinh viên.');
    }
    return updatedSinhVien;
  }
}
