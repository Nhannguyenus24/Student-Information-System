import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Khoa, KhoaDocument } from 'src/schemas/Khoa.schema';

import { updateKhoaDTO } from './dto/updateKhoa.dto';
import { getFacultyListDTO } from './dto/getFacultyList.dto';


@Injectable()
export class KhoaService {
  constructor(
    @InjectModel(Khoa.name) private readonly Khoamodel: Model<KhoaDocument>,
  ) {}

  async addFaculty(TenKhoa: string): Promise<Khoa> {
    const MaKhoa = await this.generateUsername(TenKhoa);
    const khoa = new this.Khoamodel({ MaKhoa, TenKhoa });
    return khoa.save();
  }
  private removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  async generateUsername(fullName: string): Promise<string> {
    const normalizedFullName = this.removeDiacritics(fullName);
    const nameParts = normalizedFullName.trim().split(' ');
    const initials = nameParts
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    const count = await this.Khoamodel.countDocuments();
    const username = `${initials}${(count + 1).toString().padStart(4, '0')}`;
    return username;
  }

  async getFaculty(MaKhoa: string) {
    const khoa = this.Khoamodel.findOne({ MaKhoa }).exec();
    return khoa;
  }

  async getFacultyByID(id: string) {
    const khoa = this.Khoamodel.findById(id).exec();
    return khoa;
  }

  async getListFaculty(query: getFacultyListDTO) {
    const { pageSize, pageNumber, sortBy, sortOrder } = query;

    if (!pageSize || !pageNumber || !sortBy || !sortOrder)
      throw new BadRequestException('Thiếu các trường cần thiết');

    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const khoas = await this.Khoamodel.find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    console.log(khoas);
    return {
      pageSize,
      pageNumber,
      total: await this.Khoamodel.countDocuments(),
      data: khoas,
    };
  }

  async deleteFaculty(MaKhoa: string) {
    const khoa = await this.Khoamodel.findOne({ MaKhoa });
    console.log(khoa);
    if (!khoa) {
      throw new NotFoundException('Khoa không tồn tại.');
    }
    return await this.Khoamodel.findByIdAndDelete(khoa._id);
  }

  async updateFaculty(MaKhoa: string, updateDTO: updateKhoaDTO) {
    const khoa = await this.Khoamodel.findOne({ MaKhoa });
    if (!khoa) throw new NotFoundException('Khoa không tồn tại.');
    const existingKhoa = await this.Khoamodel.findOne({
      TenKhoa: updateDTO.TenKhoa,
    });
    if (existingKhoa && existingKhoa.MaKhoa != khoa.MaKhoa)
      throw new BadRequestException('Tên khoa đã tồn tại.');

    const updatefaculty = await this.Khoamodel.findOneAndUpdate(
      { MaKhoa },
      { $set: updateDTO },
      { new: true },
    );
    return updatefaculty;
  }
}
