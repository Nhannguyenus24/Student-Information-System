import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Deadline, KhoaHoc, KhoaHocDocument } from 'src/schemas/KhoaHoc.schema';
import { AddCourseDto } from './dto/add-KhoaHoc.dto';
import { GetCourseListDto } from './dto/getListCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { SinhVienService } from 'src/SinhVien/SinhVien.service';
import { GiangVien, GiangVienDocument } from 'src/schemas/GiangVien.schema';
import { UploadService } from 'src/upload/upload.service';
import {
  DanhGiaKhoaHoc,
  DanhGiaKhoaHocDocument,
} from 'src/schemas/DanhGiaKhoaHoc.schema';
import { RateCourseDto } from './dto/rateCourse.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DanhGia } from 'src/schemas/BaiKiemTra.schema';
import { LichHoc, LichHocDocument } from 'src/schemas/LichHoc.schema';
import { CreateDeadlineDto } from './dto/createDeadline.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Mode } from 'fs';
import { UpdateDeadlineDto } from './dto/updateDeadline.dto';
import { AddTeacherintoCourseDto } from './dto/addTeacherDto';
import { RemoveTeacherDto } from './dto/removeTeacher.dto';

@Injectable()
export class KhoaHocService {
  constructor(
    @InjectModel(KhoaHoc.name)
    private readonly khoaHocModel: Model<KhoaHocDocument>,
    @InjectModel(DanhGiaKhoaHoc.name)
    private readonly danhGiaKhoaHocModel: Model<DanhGiaKhoaHocDocument>,
    @InjectModel(LichHoc.name)
    private readonly lichHocModel: Model<LichHocDocument>,
    private readonly sinhVienService: SinhVienService,
    private readonly uploadService: UploadService,
    @InjectModel(GiangVien.name)
    private readonly giangVienModel: Model<GiangVienDocument>,
  ) {}

  async addCourse(KhoaHocdto: AddCourseDto) {
    const TenKhoaHoc = KhoaHocdto.TenKhoaHoc;
    const MaKhoaHoc = await this.generateCoursename(TenKhoaHoc);

    const existingName = await this.khoaHocModel.findOne({ TenKhoaHoc });
    if (existingName && existingName.MaKhoaHoc !== MaKhoaHoc) {
      throw new BadRequestException('Tên khóa học đã tồn tại');
    }

    const KhoaID = KhoaHocdto.KhoaID;
    const GiangVienID = KhoaHocdto.GiangVienID;

    const giangVien = await this.giangVienModel.findById(GiangVienID).exec();

    if (giangVien?.KhoaID.toString() !== KhoaID)
      throw new BadRequestException('Giảng viên không thuộc khoa này.');

    const SoTinChi = KhoaHocdto.SoTinChi;
    const MoTa = KhoaHocdto.MoTa;
    const SoLuongToiDa = KhoaHocdto.SoLuongToiDa;
    const HanDangKy = KhoaHocdto.HanDangKy;
    const NgayBatDau = KhoaHocdto.NgayBatDau;
    const NgayKetThuc = KhoaHocdto.NgayKetThuc;
    console.log('validate: ', MaKhoaHoc);
    const khoaHoc = new this.khoaHocModel({
      MaKhoaHoc,
      TenKhoaHoc,
      GiangVienID,
      SoTinChi,
      MoTa,
      NgayCapNhat: Date.now(),
      SoLuongToiDa,
      SoLuongSinhVienDangKy: 0,
      HanDangKy,
      NgayBatDau,
      NgayKetThuc,
      KhoaID,
    });
    return khoaHoc.save();
  }

  async generateCoursename(fullName: string): Promise<string> {
    const normalizedFullName = this.removeDiacritics(fullName);
    const nameParts = normalizedFullName.trim().split(' ');
    // const lastName = nameParts.pop();
    const initials = nameParts
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    const count = await this.khoaHocModel.countDocuments();
    const username = `${initials}${(count + 1).toString().padStart(4, '0')}`;
    return username;
  }
  private removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async getRegisteredStudent(MaKhoaHoc: string) {
    const khoaHoc = await this.khoaHocModel
      .findOne({ MaKhoaHoc })
      .populate({
        path: 'SinhVienDangKy',
        select: 'HoTen',
      })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const studentDetails = (
      khoaHoc.SinhVienDangKy as unknown[] as { _id: string; HoTen: string }[]
    ).map((sinhVien) => ({
      id: sinhVien._id,
      HoTen: sinhVien.HoTen,
    }));
    // const studentNames = (khoaHoc.SinhVienDangKy as unknown[] as { HoTen: string }[]).map(sinhVien => sinhVien.HoTen);
    return studentDetails;
  }
  async getCourse(MaKhoaHoc: string) {
    console.log('Mã khóa học', MaKhoaHoc);
    const khoaHoc = await this.khoaHocModel
      .findOne({ MaKhoaHoc })
      .populate('GiangVienID', 'HoTen')
      .populate('KhoaID', 'TenKhoa')
      .exec();
    return khoaHoc;
  }

  async getCourseByID(KhoaHocID: string) {
    return await this.khoaHocModel.findById(KhoaHocID).exec();
  }
  async getListCourse(query: GetCourseListDto) {
    const { pageSize, pageNumber, sortBy, sortOrder } = query;

    if (!pageSize || !pageNumber || !sortBy || !sortOrder)
      throw new BadRequestException('Thiếu các trường cần thiết');

    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const khoaHocs = await this.khoaHocModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate('GiangVienID', 'HoTen')
      .exec();

    // console.log(khoaHocs);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const khoaHocIds = khoaHocs.map((kh) => (kh as any)._id.toString());
    console.log(khoaHocIds);
    const lichHocList = await this.lichHocModel
      .find({ KhoaHocID: { $in: khoaHocIds } })
      .populate('GiangVienID', 'HoTen')
      .exec();
    console.log(lichHocList);
    const khoaHocsDetails = khoaHocs.map((khoahoc) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const khoaHocid = (khoahoc as any)._id as Types.ObjectId;
      return {
        ...khoahoc.toObject(),
        LichHoc: lichHocList
          .filter((lh) => lh.KhoaHocID.toString() === khoaHocid.toString())
          .map((lh) => ({
            NgayHoc: lh.NgayHoc,
            ThoiGianBatDau: lh.ThoiGianBatDau,
            ThoiGianKetThuc: lh.ThoiGianKetThuc,
            DiaDiem: lh.DiaDiem,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            GiangVien: lh.GiangVienID ? (lh.GiangVienID as any).HoTen : null,
            NgayCapNhat: lh.NgayCapNhat,
          })),
      };
    });

    return {
      pageSize,
      pageNumber,
      total: await this.khoaHocModel.countDocuments(),
      data: khoaHocsDetails,
    };
  }

  async updateCourse(MaKhoaHoc: string, updateCourseDto: UpdateCourseDto) {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc });
    console.log(MaKhoaHoc);
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }

    // if (updateCourseDto.TenKhoaHoc) {
    //     const existingName = await this.khoaHocModel.findOne({TenKhoaHoc: updateCourseDto.TenKhoaHoc});
    //     if (existingName && existingName.MaKhoaHoc !== MaKhoaHoc) {
    //         throw new BadRequestException('Tên khóa học đã tồn tại');
    //     }
    // }

    const updatedKhoaHoc = await this.khoaHocModel.findOneAndUpdate(
      { MaKhoaHoc },
      { $set: updateCourseDto, NgayCapNhat: new Date() },
      { new: true },
    );

    return updatedKhoaHoc;
  }

  async deleteCourse(MaKhoaHoc: string) {
    // return await this.khoaHocModel.findOneAndDelete({MaKhoaHoc}).exec();
    try {
      const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc });
      if (!khoaHoc) {
        throw new NotFoundException('Khóa học không tồn tại.');
      }
      await this.khoaHocModel.findOneAndDelete({ MaKhoaHoc }).exec();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Xóa khóa học thất bại: ${error.message}`);
    }
  }

  async searchCourse(query: string) {
    console.log('query', query);
    const khoaHoc = await this.khoaHocModel.find({
      $or: [
        { MaKhoaHoc: { $regex: query, $options: 'i' } },
        { TenKhoaHoc: { $regex: query, $options: 'i' } },
      ],
    });
    if (khoaHoc.length === 0)
      throw new NotFoundException('Không tìm thấy khóa học.');

    return khoaHoc;
  }

  async registerStudentToCourse(MaKhoaHoc: string, username: string) {
    // console.log('Mã khóa học: ', studentId);
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc }).exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const sinhVien = await this.sinhVienService.getStudentByMSSV(username);
    console.log('sinh vien id: ', sinhVien.KhoaID.toString());
    console.log('khóa học id: ', khoaHoc.KhoaID.toString());
    if (sinhVien.KhoaID._id.toString() !== khoaHoc.KhoaID.toString())
      throw new BadRequestException(
        'Sinh viên không thể đăng kí khóa học này.',
      );

    if (khoaHoc.SoLuongSinhVienDangKy >= khoaHoc.SoLuongToiDa) {
      throw new BadRequestException('Khóa học đã đầy.');
    }
    const currentDate = new Date();
    if (currentDate > new Date(khoaHoc.HanDangKy)) {
      throw new BadRequestException('Đã hết thời gian đăng ký.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sinhVienId = (sinhVien as any)._id as Types.ObjectId;
    if (!khoaHoc.SinhVienDangKy.includes(sinhVienId)) {
      khoaHoc.SinhVienDangKy.push(sinhVienId);
      khoaHoc.SoLuongSinhVienDangKy += 1;
      await khoaHoc.save();
      return { message: 'Đăng ký khóa học thành công!' };
    } else {
      throw new BadRequestException('Sinh viên đã đăng ký khóa học này.');
    }
  }
  // const studentObjectId = new Types.ObjectId(studentId);

  async addStudentToCourseByAdmin(MaKhoaHoc: string, mssv: string) {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc });
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const sinhVien = await this.sinhVienService.getStudentByMSSV(mssv);
    console.log(sinhVien.KhoaID.toString());
    if (sinhVien.KhoaID._id.toString() !== khoaHoc.KhoaID.toString())
      throw new BadRequestException(
        'Sinh viên không thể đăng kí khóa học này.',
      );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sinhVienId = (sinhVien as any)._id as Types.ObjectId;

    if (!khoaHoc.SinhVienDangKy.includes(sinhVienId)) {
      khoaHoc.SinhVienDangKy.push(sinhVienId);
      khoaHoc.SoLuongSinhVienDangKy += 1;
      if (khoaHoc.SoLuongToiDa < khoaHoc.SoLuongSinhVienDangKy)
        khoaHoc.SoLuongToiDa += 1;
      await khoaHoc.save();
      return { message: 'Sinh viên đã được thêm vào khóa học!' };
    } else {
      throw new BadRequestException(
        'Sinh viên đã có trong danh sách khóa học này.',
      );
    }
  }

  async removeStudentFromCourseByAdmin(MaKhoaHoc: string, mssv: string) {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc });
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const sinhVien = await this.sinhVienService.getStudentByMSSV(mssv);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sinhVienId = (sinhVien as any)._id as Types.ObjectId;
    console.log(sinhVienId);

    const index = khoaHoc.SinhVienDangKy.indexOf(sinhVienId);
    if (index !== -1) {
      khoaHoc.SinhVienDangKy.splice(index, 1);
      khoaHoc.SoLuongSinhVienDangKy -= 1;
      await khoaHoc.save();
      return { message: 'Sinh viên đã được xóa khỏi khóa học.' };
    } else {
      throw new BadRequestException(
        'Sinh viên không có trong danh sách khóa học này.',
      );
    }
  }

  async getFilesByKhoaHocId(khoaHocId: string) {
    const khoaHoc = await this.khoaHocModel.findById(khoaHocId).exec();
    if (!khoaHoc) {
      throw new NotFoundException(
        `Không tìm thấy khóa học với ID ${khoaHocId}`,
      );
    }

    const files = await this.khoaHocModel
      .findById(khoaHocId)
      .populate('TaiLieu')
      .exec();
    return files?.TaiLieu;
  }

  async deleteFile(khoaHocId: string, taiLieuId: string, user: any) {
    const khoaHoc = await this.khoaHocModel.findById(khoaHocId).exec();
    if (!khoaHoc)
      throw new NotFoundException(`Không tìm thấy khóa học ${khoaHocId}`);

    return await this.uploadService.deleteFile(taiLieuId, khoaHocId, user);
  }

  async rateCourse(
    MaKhoaHoc: string,
    mssv: string,
    rateCourseDto: RateCourseDto,
  ) {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc }).exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại.');
    }

    const sinhVien = await this.sinhVienService.getStudentByMSSV(mssv);
    if (!sinhVien) {
      throw new NotFoundException('Không tìm thấy sinh viên.');
    }
    // sinhVien._id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sinhVienId = (sinhVien as any)._id as Types.ObjectId;
    if (
      !khoaHoc.SinhVienDangKy.some(
        (id) => id.toString() === sinhVienId.toString(),
      )
    ) {
      throw new BadRequestException('Sinh viên chưa đăng ký khóa học này.');
    }

    const existingRating = await this.danhGiaKhoaHocModel
      .findOne({ KhoaHocID: khoaHoc._id, SinhVienID: sinhVienId })
      .exec();
    if (existingRating) {
      throw new BadRequestException('Sinh viên đã đánh giá khóa học này.');
    }

    // console.log(rateCourseDto.DanhGia);
    const danhGia = new this.danhGiaKhoaHocModel({
      KhoaHocID: khoaHoc._id,
      SinhVienID: sinhVienId,
      SoSao: rateCourseDto.SoSao,
      DanhGia: rateCourseDto.DanhGia,
      ThoiGianDanhGia: new Date(),
    });
    return await danhGia.save();
  }

  async getListCourseRatings(MaKhoaHoc: string) {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc }).exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại.');
    }

    const danhGiaList = await this.danhGiaKhoaHocModel
      .find({ KhoaHocID: khoaHoc._id })
      .populate('SinhVienID', 'HoTen MSSV')
      .exec();
    const soLuongDanhGia = danhGiaList.length;
    const tongSoSao = danhGiaList.reduce((sum, dg) => sum + dg.SoSao, 0);
    return {
      MaKhoaHoc,
      TenKhoaHoc: khoaHoc.TenKhoaHoc,
      SoLuongDanhGia: soLuongDanhGia,
      TrungBinhSoSao: soLuongDanhGia > 0 ? tongSoSao / soLuongDanhGia : 0,
      DanhGia: danhGiaList.map((dg) => ({
        SinhVienID: dg.SinhVienID._id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        HoTen: (dg.SinhVienID as any).HoTen,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        MSSV: (dg.SinhVienID as any).MSSV,
        SoSao: dg.SoSao,
        DanhGia: dg.DanhGia,
        ThoiGianDanhGia: dg.ThoiGianDanhGia,
      })),
    };
  }

  async getCourseRatings(MaKhoaHoc: string) {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc }).exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại.');
    }

    const danhGiaList = await this.danhGiaKhoaHocModel
      .find({ KhoaHocID: khoaHoc._id })
      .populate('SinhVienID', 'HoTen MSSV')
      .exec();
    const soLuongDanhGia = danhGiaList.length;
    const tongSoSao = danhGiaList.reduce((sum, dg) => sum + dg.SoSao, 0);
    return {
      SoLuongDanhGia: soLuongDanhGia,
      TrungBinhSoSao: soLuongDanhGia > 0 ? tongSoSao / soLuongDanhGia : 0,
    };
  }

  async createDeadline(
    khoaHocId: string,
    createDeadlineDto: CreateDeadlineDto,
    username: string,
    role: string,
  ): Promise<{ khoaHocId: string; deadline: any }> {
    const { MoTa, NgayBatDau, NgayHetHan } = createDeadlineDto;

    const khoaHoc = await this.khoaHocModel
      .findById(khoaHocId)
      .populate('GiangVienID')
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException(
        `Không tìm thấy khóa học với ID ${khoaHocId}`,
      );
    }

    if (role !== 'admin') {
      const giangViens = khoaHoc.GiangVienID as unknown as GiangVienDocument[];
      const isGiangVien = giangViens.some(
        (giangVien) => giangVien.MaGV === username,
      );
      if (!isGiangVien) {
        throw new UnauthorizedException(
          'Bạn không có quyền tạo deadline cho khóa học này',
        );
      }
    }

    const startDate = new Date(NgayBatDau);
    const endDate = new Date(NgayHetHan);
    if (startDate >= endDate) {
      throw new BadRequestException('Ngày bắt đầu phải trước ngày hết hạn');
    }
    if (endDate < new Date()) {
      throw new BadRequestException('Ngày hết hạn không được là quá khứ');
    }

    const newDeadline = {
      MoTa,
      NgayBatDau: startDate,
      NgayHetHan: endDate,
      Submissions: [],
    };

    await this.khoaHocModel.updateOne(
      { _id: khoaHocId },
      { $push: { Deadlines: newDeadline } },
    );
    // console.log(newDeadline);
    // console.log(await this.khoaHocModel.findById(khoaHocId));
    return { khoaHocId, deadline: newDeadline };
  }

  async updateDeadline(
    khoaHocId: string,
    deadlineId: string,
    updateDeadlineDto: UpdateDeadlineDto,
    username: string,
    role: string,
  ) {
    const { MoTa, NgayBatDau, NgayHetHan } = updateDeadlineDto;

    const khoaHoc = await this.khoaHocModel
      .findOne({ _id: khoaHocId, 'Deadlines._id': deadlineId })
      .populate('GiangVienID')
      .exec();
    console.log(khoaHoc);
    if (!khoaHoc) {
      throw new NotFoundException(
        `Không tìm thấy khóa học hoặc deadline với ID ${deadlineId}`,
      );
    }

    if (role !== 'admin') {
      const giangViens = khoaHoc.GiangVienID as unknown as GiangVienDocument[];
      const isGiangVien = giangViens.some(
        (giangVien) => giangVien.MaGV === username,
      );
      if (!isGiangVien) {
        throw new UnauthorizedException(
          'Bạn không có quyền cập nhật deadline này',
        );
      }
    }

    const deadline = khoaHoc.Deadlines.find(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      (d) => (d as any)._id.toString() === deadlineId,
    );
    console.log(deadline);
    if (!deadline) {
      throw new NotFoundException(
        `Không tìm thấy deadline với ID ${deadlineId}`,
      );
    }
    if (NgayBatDau || NgayHetHan) {
      const startDate = NgayBatDau ? new Date(NgayBatDau) : deadline.NgayBatDau;
      const endDate = NgayHetHan ? new Date(NgayHetHan) : deadline.NgayHetHan;
      if (startDate >= endDate) {
        throw new BadRequestException('Ngày bắt đầu phải trước ngày hết hạn');
      }
      if (endDate < new Date()) {
        throw new BadRequestException('Ngày hết hạn không được là quá khứ');
      }
    }
    console.log(updateDeadlineDto);

    return await this.khoaHocModel.updateOne(
      { _id: khoaHocId, 'Deadlines._id': deadlineId },
      {
        $set: {
          ...(MoTa !== undefined && { 'Deadlines.$.MoTa': MoTa }),
          ...(NgayBatDau !== undefined && {
            'Deadlines.$.NgayBatDau': new Date(NgayBatDau),
          }),
          ...(NgayHetHan !== undefined && {
            'Deadlines.$.NgayHetHan': new Date(NgayHetHan),
          }),
        },
      },
    );
  }

  async addTeacherintoCourse(
    _id: string,
    addTeacherintoCoursedto: AddTeacherintoCourseDto,
  ) {
    const khoahoc = await this.khoaHocModel.findById({ _id }).exec();
    if (!khoahoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }

    const MaGV = addTeacherintoCoursedto.MaGV;
    const giangVien = await this.giangVienModel.findOne({ MaGV }).exec();
    if (!giangVien) {
      throw new NotFoundException('Giảng viên không tồn tại');
    }
    if (!giangVien._id) {
      throw new NotFoundException('Giảng viên không tồn tại');
    }

    if (giangVien?.KhoaID.toString() !== khoahoc.KhoaID.toString())
      throw new BadRequestException('Giảng viên không thuộc khoa này.');

    return await this.khoaHocModel.findByIdAndUpdate(
      _id,
      { $push: { GiangVienID: giangVien._id } },
      { new: true },
    );
  }

  async removeTeacher(_id: string, removeTeacherDto: RemoveTeacherDto) {
    const khoahoc = await this.khoaHocModel.findById({ _id }).exec();
    if (!khoahoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }

    const MaGV = removeTeacherDto.MaGV;
    const giangVien = await this.giangVienModel.findOne({ MaGV }).exec();
    if (!giangVien) {
      throw new NotFoundException('Giảng viên không tồn tại');
    }
    if (!giangVien._id) {
      throw new NotFoundException('Giảng viên không tồn tại');
    }
    //console.log(khoahoc.GiangVienID);
    //console.log(giangVien._id);
    // if (!khoahoc.GiangVienID.some((id) => id.toString() === giangVien._id)) {
    //   throw new BadRequestException('Giảng viên không thuộc khóa học này');
    // }
    if (!khoahoc.GiangVienID.includes(giangVien._id as Types.ObjectId))
      throw new BadRequestException('Giảng viên không thuộc khóa học này');

    const updatedKhoaHoc = await this.khoaHocModel
      .findByIdAndUpdate(
        _id,
        { $pull: { GiangVienID: giangVien._id } },
        { new: true },
      )
      .populate('GiangVienID')
      .exec();

    if (!updatedKhoaHoc) {
      throw new NotFoundException('Không thể cập nhật khóa học');
    }

    return updatedKhoaHoc;
  }
}
