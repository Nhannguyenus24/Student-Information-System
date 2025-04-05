import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { KhoaHoc, KhoaHocDocument } from 'src/schemas/KhoaHoc.schema';
import { AddCourseDto } from './dto/add-KhoaHoc.dto';
import { GetCourseListDto } from './dto/getListCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { SinhVienService } from 'src/SinhVien/SinhVien.service';
import { GiangVienService } from 'src/GiangVien/GiangVien.service';
import { GiangVien, GiangVienDocument } from 'src/schemas/GiangVien.schema';
import { transcode } from 'buffer';
import { TaiLieu, TaiLieuDocument } from 'src/schemas/TaiLieu.schema';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class KhoaHocService {
    constructor(
        @InjectModel(KhoaHoc.name) private readonly khoaHocModel: Model<KhoaHocDocument>,
        private readonly sinhVienService: SinhVienService,
        private readonly uploadService: UploadService,
        @InjectModel(GiangVien.name) private readonly giangVienModel: Model<GiangVienDocument>,
        // @InjectModel(TaiLieu.name) private taiLieuModel: Model<TaiLieuDocument>,
    ){}


    async addCourse(KhoaHocdto: AddCourseDto)
    {

        const TenKhoaHoc = KhoaHocdto.TenKhoaHoc;
        const MaKhoaHoc = await this.generateCoursename(TenKhoaHoc);

        const existingName = await this.khoaHocModel.findOne({TenKhoaHoc});
        if (existingName && existingName.MaKhoaHoc !== MaKhoaHoc) {
            throw new BadRequestException('Tên khóa học đã tồn tại');
        }
        
        const KhoaID = KhoaHocdto.KhoaID;
        const GiangVienID = KhoaHocdto.GiangVienID;

        const giangVien = await this.giangVienModel.findById(GiangVienID).exec();

        if (giangVien?.KhoaID.toString() !== KhoaID)
            throw new BadRequestException('Giảng viên không thuộc khoa này.');

        const TroGiangID = KhoaHocdto.TroGiangID;
        const troGiang = await this.giangVienModel.findById(TroGiangID).exec();
        if (troGiang?.KhoaID.toString() !== KhoaID)
            throw new BadRequestException('Trợ giảng không thuộc khoa này.');
        const SoTinChi = KhoaHocdto.SoTinChi;
        const MoTa = KhoaHocdto.MoTa;
        const SoLuongToiDa = KhoaHocdto.SoLuongToiDa;
        const HanDangKy = KhoaHocdto.HanDangKy;
        const NgayBatDau = KhoaHocdto.NgayBatDau;
        const NgayKetThuc = KhoaHocdto.NgayKetThuc;
        console.log('validate: ',MaKhoaHoc);
        const khoaHoc = new this.khoaHocModel({
            MaKhoaHoc,
            TenKhoaHoc,   
            GiangVienID,
            TroGiangID,
            SoTinChi,
            MoTa,      
            NgayCapNhat: Date.now(),
            SoLuongToiDa,
            SoLuongSinhVienDangKy: 0,
            HanDangKy,
            NgayBatDau,
            NgayKetThuc,
            KhoaID
        });
        return khoaHoc.save();
    }

    async generateCoursename(fullName: string): Promise<string> {
        const normalizedFullName = this.removeDiacritics(fullName);
        const nameParts = normalizedFullName.trim().split(' ');
        // const lastName = nameParts.pop();
        const initials = nameParts.map(word => word.charAt(0).toUpperCase()).join('');
        const count = await this.khoaHocModel.countDocuments();
        const username = `${initials}${(count + 1).toString().padStart(4, '0')}`;
        return username;
    }
    private removeDiacritics(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    async getRegisteredStudent(MaKhoaHoc: string) {
        const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc })
                                            .populate({
                                                path: 'SinhVienDangKy',
                                                select: 'HoTen',
                                            })
                                            .exec();
        if (!khoaHoc) {
          throw new NotFoundException('Khóa học không tồn tại');
        }
        const studentDetails = (khoaHoc.SinhVienDangKy as unknown[] as { _id: string, HoTen: string }[]).map(sinhVien => ({
            id: sinhVien._id,
            HoTen: sinhVien.HoTen,
        }));
        // const studentNames = (khoaHoc.SinhVienDangKy as unknown[] as { HoTen: string }[]).map(sinhVien => sinhVien.HoTen);
        return studentDetails;
    }
    async getCourse(MaKhoaHoc: string)
    {
        console.log('Mã khóa học',MaKhoaHoc);
        const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc}).populate('GiangVienID', 'HoTen')
                                                                    .populate('TroGiangID', 'HoTen')
                                                                    .populate('KhoaID', 'TenKhoa')
                                                                    .exec();
        return khoaHoc;
    }
    
    async getCourseByID(KhoaHocID: string)
    {
        return await this.khoaHocModel.findById(KhoaHocID).exec();
    }
    async getListCourse(query: GetCourseListDto)
    {
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
            .exec();;

        console.log(khoaHocs);
        return {
            pageSize,
            pageNumber,
            total: await this.khoaHocModel.countDocuments(),
            data: khoaHocs,
        };
    }

    async updateCourse(MaKhoaHoc: string, updateCourseDto: UpdateCourseDto){
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

    async deleteCourse(MaKhoaHoc: string){
        // return await this.khoaHocModel.findOneAndDelete({MaKhoaHoc}).exec();
        try{
            const khoaHoc = await this.khoaHocModel.findOne({MaKhoaHoc});
            if (!khoaHoc) {
                throw new NotFoundException('Khóa học không tồn tại.');
            }
            await this.khoaHocModel.findOneAndDelete({MaKhoaHoc}).exec();
        }
        catch(error)
        {
            throw new Error(`Xóa khóa học thất bại: ${error.message}`);
        }
    }

    async searchCourse(query: string) {
        console.log('query', query);
        const khoaHoc = await this.khoaHocModel.find({
            $or: [
                {MaKhoaHoc: {$regex: query, $options: 'i'}},
                {TenKhoaHoc: {$regex: query, $options:'i'}}
            ]
        })
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
        if (sinhVien.KhoaID.toString() !== khoaHoc.KhoaID.toString())
            throw new BadRequestException('Sinh viên không thể đăng kí khóa học này.');
        
        if (khoaHoc.SoLuongSinhVienDangKy >= khoaHoc.SoLuongToiDa) {
            throw new BadRequestException('Khóa học đã đầy.');
        }
        const currentDate = new Date();
        if (currentDate > new Date(khoaHoc.HanDangKy) ) {
            throw new BadRequestException('Đã hết thời gian đăng ký.');
        }
        

        const sinhVienId = (sinhVien as any)._id as Types.ObjectId;
        console.log(sinhVienId);
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
        if (sinhVien.KhoaID.toString() !== khoaHoc.KhoaID.toString())
            throw new BadRequestException('Sinh viên không thể đăng kí khóa học này.');
        
        const sinhVienId = (sinhVien as any)._id as Types.ObjectId;
        console.log(sinhVienId);

        if (!khoaHoc.SinhVienDangKy.includes(sinhVienId)) {
            khoaHoc.SinhVienDangKy.push(sinhVienId);
            khoaHoc.SoLuongSinhVienDangKy += 1;
            if (khoaHoc.SoLuongToiDa < khoaHoc.SoLuongSinhVienDangKy)
                khoaHoc.SoLuongToiDa += 1;
            await khoaHoc.save();
            return { message: 'Sinh viên đã được thêm vào khóa học!' };
        } else {
            throw new BadRequestException('Sinh viên đã có trong danh sách khóa học này.');
        }
    }
    
    async removeStudentFromCourseByAdmin(MaKhoaHoc: string, mssv: string) {
        const khoaHoc = await this.khoaHocModel.findOne({ MaKhoaHoc });
        if (!khoaHoc) {
            throw new NotFoundException('Khóa học không tồn tại');
        }
        const sinhVien = await this.sinhVienService.getStudentByMSSV(mssv);
        const sinhVienId = (sinhVien as any)._id as Types.ObjectId;
        console.log(sinhVienId);

        const index = khoaHoc.SinhVienDangKy.indexOf(sinhVienId);
        if (index !== -1) {
            khoaHoc.SinhVienDangKy.splice(index, 1);
            khoaHoc.SoLuongSinhVienDangKy -= 1;
            await khoaHoc.save();
            return { message: 'Sinh viên đã được xóa khỏi khóa học.' };
        } else {
            throw new BadRequestException('Sinh viên không có trong danh sách khóa học này.');
        }
    }

    async getFilesByKhoaHocId(khoaHocId: string) {
        const khoaHoc = await this.khoaHocModel.findById(khoaHocId).exec();
        if (!khoaHoc) {
          throw new NotFoundException(`Không tìm thấy khóa học với ID ${khoaHocId}`);
        }
    
        const files = await this.khoaHocModel.findById(khoaHocId).populate('TaiLieu').exec();
        return files?.TaiLieu;
    }

    async deleteFile(khoaHocId: string, taiLieuId: string, user: any): Promise<void> {
        
        const khoaHoc = await this.khoaHocModel.findById(khoaHocId).exec();
        if (!khoaHoc) throw new NotFoundException(`Không tìm thấy khóa học ${khoaHocId}`);
    
        await this.uploadService.deleteFile(taiLieuId, khoaHocId, user);
      }
}
