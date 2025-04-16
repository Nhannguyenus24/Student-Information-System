import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SinhVien, SinhVienDocument } from '../schemas/SinhVien.schema';
import { KhoaHoc, KhoaHocDocument } from '../schemas/KhoaHoc.schema';
import { BaiKiemTra, BaiKiemTraDocument } from '../schemas/BaiKiemTra.schema';
import { GiangVien, GiangVienDocument } from 'src/schemas/GiangVien.schema';
import { UpdateTestDto } from './dto/update-Test.dto';
import { CreateTestDto } from './dto/create-Test.dto';
import * as XLSX from 'xlsx';
import { CreateDeThiDto } from './dto/de.thi.dto';

@Injectable()
export class BaiKiemTraService {
  constructor(
    @InjectModel(SinhVien.name) private sinhVienModel: Model<SinhVienDocument>,
    @InjectModel(GiangVien.name)
    private giangVienModel: Model<GiangVienDocument>,
    @InjectModel(KhoaHoc.name) private khoaHocModel: Model<KhoaHocDocument>,
    @InjectModel(BaiKiemTra.name)
    private BaiKiemTraModel: Model<BaiKiemTraDocument>,
  ) {}

  async getTestByKhoaHocAndMSSV(KhoaHocID: string, MA: string) {
    const mssv = MA;
    const MaGV = MA;
    const sinhVien = await this.sinhVienModel.findOne({ mssv }).exec();
    const giangvien = await this.giangVienModel.findOne({ MaGV });

    if (!sinhVien && !giangvien) {
      throw new NotFoundException(
        'Sinh viên hoặc giảng viên không tồn tại trong khóa học này',
      );
    }
    const khoaHoc = await this.khoaHocModel
      .findOne({ _id: KhoaHocID as unknown as Types.ObjectId })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    let isSinhVienInKhoaHoc = false;
    if (sinhVien && (sinhVien as unknown as Types.ObjectId)._id) {
      isSinhVienInKhoaHoc = khoaHoc.SinhVienDangKy.some(
        (sinhVienID) =>
          sinhVienID.toString() ===
          (sinhVien as unknown as Types.ObjectId)._id.toString(),
      );
      isSinhVienInKhoaHoc = true;
    }
    if (
      giangvien &&
      khoaHoc.GiangVienID.toString() !==
        (giangvien._id as Types.ObjectId).toString() &&
      !isSinhVienInKhoaHoc
    ) {
      throw new UnauthorizedException(
        'Giảng viên hoặc sinh viên không thuộc khóa học này',
      );
    }

    const test = await this.BaiKiemTraModel.find({ KhoaHocID })
      .populate({
        path: 'KhoaHocID',
        model: 'KhoaHoc',
      })
      .exec();
    return test;
  }

  async getTestById(_id: string): Promise<BaiKiemTra> {
    const Test = await this.BaiKiemTraModel.findById(
      _id as unknown as Types.ObjectId,
    )
      .populate({
        path: 'KhoaHocID',
        model: 'KhoaHoc',
      })
      .exec();
    if (!Test) {
      throw new NotFoundException('Bài Kiểm tra không tồn tại không tồn tại');
    }
    return Test;
  }

  async updateTest(
    id: string,
    updateTestDto: UpdateTestDto,
    MaGV: string,
  ): Promise<{ message: string }> {
    const baiKiemTra = await this.BaiKiemTraModel.findById(
      new Types.ObjectId(id),
    ).exec();
    if (!baiKiemTra) {
      throw new NotFoundException('Bài kiểm tra không tồn tại');
    }
    const khoaHoc = await this.khoaHocModel
      .findOne({ _id: baiKiemTra.KhoaHocID })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const giangvien = await this.giangVienModel.findOne({ MaGV });

    if (!giangvien) {
      throw new NotFoundException(`Giảng viên không tồn tại`);
    }
    if (
      giangvien &&
      khoaHoc.GiangVienID.toString() !==
        (giangvien._id as Types.ObjectId).toString()
    ) {
      throw new UnauthorizedException('Giảng viên không thuộc khóa học này');
    }
    const updateBaiKiemTra = await this.BaiKiemTraModel.findByIdAndUpdate(
      id,
      updateTestDto,
      { new: true },
    );

    if (!updateBaiKiemTra) {
      throw new NotFoundException('Cập nhật bài kiểm tra không thành công');
    }

    return {
      message: 'Cập nhật bài kiểm tra thành công',
    };
  }

  async addTest(createTestDto: CreateTestDto, MaGV: string) {
    const khoaHoc = await this.khoaHocModel
      .findOne({ _id: createTestDto.KhoaHocID })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const giangvienid = await this.giangVienModel.findOne({ MaGV });

    if (!giangvienid) {
      throw new NotFoundException(`Giảng viên không dạy khóa học này`);
    }
    if (
      khoaHoc.GiangVienID.toString() !==
      (giangvienid._id as Types.ObjectId).toString()
    ) {
      throw new UnauthorizedException(
        'Chỉ giảng viên của khóa học này mới có thể thêm bài kiểm tra',
      );
    }

    const newTest = new this.BaiKiemTraModel(createTestDto);
    const savedTest = await newTest.save();
    return savedTest;
  }

  async deleteTestByMaKhoaHoc(
    MaKhoaHoc: string,
    _id: string,
    MaGV: string,
  ): Promise<any> {
    const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc }).exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const giangvien = await this.giangVienModel.findOne({ MaGV });

    if (!giangvien) {
      throw new NotFoundException(`Giảng viên không tồn tại`);
    }
    if (
      giangvien &&
      khoaHoc.GiangVienID.toString() !==
        (giangvien._id as Types.ObjectId).toString()
    ) {
      throw new UnauthorizedException('Giảng viên không thuộc khóa học này');
    }

    const result = await this.BaiKiemTraModel.deleteOne(
      _id as unknown as Types.ObjectId,
    ).exec();
    return result;
  }

  async importExcel(
    file: Express.Multer.File,
    createTestDto: CreateTestDto,
    MaGV: string,
  ): Promise<void> {
    const khoaHoc = await this.khoaHocModel
      .findOne({ _id: createTestDto.KhoaHocID })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Khóa học không tồn tại');
    }
    const giangvienid = await this.giangVienModel.findOne({ MaGV });

    if (!giangvienid) {
      throw new NotFoundException(`Giảng viên không dạy khóa học này`);
    }
    if (
      khoaHoc.GiangVienID.toString() !==
      (giangvienid._id as Types.ObjectId).toString()
    ) {
      throw new UnauthorizedException(
        'Chỉ giảng viên của khóa học này mới có thể thêm bài kiểm tra',
      );
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    const deThiArray: CreateDeThiDto[] = [];

    data.forEach((row: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const dapAn3 = row['DapAn3'] ?? null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const dapAn4 = row['DapAn4'] ?? null;

      const deThi: CreateDeThiDto = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        CauHoi: row['CauHoi(string)'],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        DapAn: [
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          row['CauTraLoi1'],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          row['CauTraLoi2'],
          dapAn3,
          dapAn4,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        DapAnDung: [row['DapAn1'], row['DapAn2'], row['DapAn3'], row['DapAn4']],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        Giaithich: row['CauGiaiThich'] || '',
      };

      deThiArray.push(deThi);
    });

    console.log(deThiArray);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const baiKiemTra = new this.BaiKiemTraModel({
      ...createTestDto,
      DeThi: deThiArray,
    });
    await baiKiemTra.save();

  }
}
