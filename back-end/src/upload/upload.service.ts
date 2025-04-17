// src/upload/upload.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaiLieu, TaiLieuDocument } from 'src/schemas/TaiLieu.schema';
import { KhoaHoc, KhoaHocDocument, Submission } from 'src/schemas/KhoaHoc.schema';
import { v4 as uuidv4 } from 'uuid';
import { GiangVien, GiangVienDocument } from 'src/schemas/GiangVien.schema';
import { SinhVien, SinhVienDocument } from 'src/schemas/SinhVien.schema';

@Injectable()
export class UploadService {
  constructor(
    private configService: ConfigService,
    @InjectModel(TaiLieu.name) private taiLieuModel: Model<TaiLieuDocument>,
    @InjectModel(KhoaHoc.name) private khoaHocModel: Model<KhoaHocDocument>,
    @InjectModel(GiangVien.name) private readonly giangVienModel: Model<GiangVienDocument>,
    @InjectModel(SinhVien.name) private readonly sinhVienModel: Model<SinhVienDocument>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  private async getBlobServiceClient() {
    const connectionString = this.configService.get<string>(
      'AZURE_STORAGE_CONNECTION_STRING',
    );
    console.log('connection string: ', connectionString);
    if (!connectionString)
      throw new Error('Không tìm thấy AZURE_STORAGE_CONNECTION_STRING');
    return BlobServiceClient.fromConnectionString(connectionString);
  }

  async   uploadFile(
    file: Express.Multer.File,
    khoaHocId: string,
    moTa: string,
    username: string,
    role: string,
  ): Promise<TaiLieu> {
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
      const giangVien = khoaHoc.GiangVienID as unknown as GiangVienDocument;

      const isGiangVien = giangVien && giangVien.MaGV === username;
      if (!isGiangVien) {
        throw new UnauthorizedException(
          'Bạn không có quyền upload tài liệu cho khóa học này',
        );
      }
    }

    const blobServiceClient = await this.getBlobServiceClient();
    const containerName = this.configService.get<string>(
      'AZURE_CONTAINER_NAME',
    );
    if (!containerName)
      throw new NotFoundException('Không tìm thấy container name');

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const fileExtension = file.originalname.split('.').pop();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const fileName = `${uuidv4()}.${fileExtension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(file.buffer);

    const fileUrl = blockBlobClient.url;

    const fileDoc = new this.taiLieuModel({
      TenTaiLieu: file.originalname,
      LinkTaiLieu: fileUrl,
      MoTa: moTa,
      NguoiDang: username,
    });
    const savedFile = await fileDoc.save();

    await this.khoaHocModel.updateOne(
      { _id: khoaHocId },
      { $push: { TaiLieu: savedFile._id } },
    );

    return savedFile;
  }

  async uploadAvatar(file: Express.Multer.File, MaGV: string, role: string) {
    const giangVien = await this.giangVienModel.findOne({ MaGV }).exec();
    if (!giangVien) {
      throw new NotFoundException(`Không tìm thấy giáo viên với MaGV ${MaGV}`);
    }

    if (MaGV !== MaGV) {
      throw new UnauthorizedException('Bạn không có quyền upload ảnh cho giáo viên này');
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Chỉ chấp nhận file ảnh (jpg, jpeg, png)');
    }

    
    const blobServiceClient = await this.getBlobServiceClient();
    const containerName = this.configService.get<string>('AZURE_CONTAINER_NAME');
    if (!containerName) {
      throw new NotFoundException('Không tìm thấy container name');
    }
    const containerClient = blobServiceClient.getContainerClient(containerName);

    if (giangVien.Anh) {
      // const oldBlobName = giangVien.Anh.split('/').pop()?.split('?')[0];
      const oldBlobName = giangVien.Anh.split('/').slice(-2).join('/');
      if (oldBlobName) {
        console.log(oldBlobName);
        const oldBlockBlobClient = containerClient.getBlockBlobClient(oldBlobName);
        // console.log(oldBlockBlobClient);
        await oldBlockBlobClient.deleteIfExists();
      }
    }
    const fileName = `avatars/${MaGV}-${uuidv4()}.${fileExtension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(file.buffer);

    const avatarUrl = blockBlobClient.url;

    await this.giangVienModel.updateOne(
      { MaGV },
      { $set: { Anh: avatarUrl } },
    );

    return { url: avatarUrl };
  }
  async getFileById(id: string): Promise<TaiLieu> {
    const file = await this.taiLieuModel.findById(id).exec();
    if (!file)
      throw new NotFoundException(`Không tìm thấy tài liệu với ID ${id}`);
    return file;
  }

  // async getFilesByKhoaHocId(khoaHocId: string): Promise<TaiLieu[]> {
  //     console.log(khoaHocId);
  //     return this.taiLieuModel.find({ khoaHocId }).exec();
  // }

  async submitAssignment(
    file: Express.Multer.File,
    khoaHocId: string,
    deadlineId: string,
    username: string,
  ): Promise<{ message: string; submission: TaiLieu }> {
    if (!file) {
      throw new BadRequestException('Không có file được tải lên');
    }

    const maxSizeDocument = 10 * 1024 * 1024; // 10MB
    const maxSizeImage = 5 * 1024 * 1024; // 5MB
    const mimeType = file.mimetype.toLowerCase();
    const isImage = mimeType.includes('image');
    const isDocument = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(mimeType);

    if (isImage && file.size > maxSizeImage) {
      throw new BadRequestException('File ảnh không được vượt quá 5MB');
    }
    if (isDocument && file.size > maxSizeDocument) {
      throw new BadRequestException('File tài liệu không được vượt quá 10MB');
    }
    if (!isImage && !isDocument) {
      throw new BadRequestException('Chỉ chấp nhận file PDF, DOCX hoặc ảnh JPG/PNG');
    }

    const sinhVien = await this.sinhVienModel.findOne({ mssv: username }).exec();
    if (!sinhVien) {
      throw new NotFoundException('Không tìm thấy sinh viên');
    }
    const khoaHoc = await this.khoaHocModel
      .findOne({
        _id: khoaHocId,
        SinhVienDangKy: sinhVien._id,
        'Deadlines._id': deadlineId,
      })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Không tìm thấy khóa học, deadline hoặc bạn chưa đăng ký môn học này');
    }

    const deadline = khoaHoc.Deadlines.find((d: any) => d._id.toString() === deadlineId);
    if (!deadline) {
      throw new NotFoundException('Không tìm thấy deadline');
    }
    if (new Date() > deadline.NgayHetHan) {
      throw new BadRequestException('Đã hết hạn nộp bài');
    }

    const oldSubmission = deadline.Submissions.find(
      (s: any) => s.SinhVienID.toString() === (sinhVien as any)._id.toString(),
    );
    console.log(oldSubmission);
    if (oldSubmission) {
      const oldTaiLieu = await this.taiLieuModel.findById(oldSubmission.TaiLieu).exec();
      console.log(oldTaiLieu);
      if (oldTaiLieu && oldTaiLieu.LinkTaiLieu) {
        const blobServiceClient = await this.getBlobServiceClient();
        const containerName = this.configService.get<string>('AZURE_CONTAINER_NAME');
        if (!containerName) {
          throw new Error('Không tìm thấy AZURE_CONTAINER_NAME');
        }
        const containerClient = blobServiceClient.getContainerClient(containerName);
  
        const oldBlobName = oldTaiLieu.LinkTaiLieu.split('/').slice(-4).join('/');
        console.log(oldBlobName);
        const oldBlockBlobClient = containerClient.getBlockBlobClient(oldBlobName);
        await oldBlockBlobClient.deleteIfExists();
      }

      await this.khoaHocModel.updateOne(
        { _id: khoaHocId, 'Deadlines._id': deadlineId },
        {
          $pull: {
            'Deadlines.$.Submissions': { SinhVienID: sinhVien._id },
          },
        },
      );
  
      if (oldTaiLieu && oldTaiLieu._id) {
        await this.taiLieuModel.deleteOne({ _id: oldTaiLieu._id }).exec();
      }
    }

    const blobServiceClient = await this.getBlobServiceClient();
    const containerName = this.configService.get<string>('AZURE_CONTAINER_NAME');
    if (!containerName) {
      throw new Error('Không tìm thấy AZURE_CONTAINER_NAME');
    }
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const extension = file.originalname.split('.').pop();
    const blobName = `submissions/${khoaHocId}/${deadlineId}/${username}-${uuidv4()}.${extension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    const fileUrl = blockBlobClient.url;
    const taiLieu = await this.taiLieuModel.create({
      TenTaiLieu: file.originalname,
      LinkTaiLieu: fileUrl,
      MoTa: `Bài nộp cho deadline ${deadline.MoTa}`,
      NguoiDang: username,
      NgayTao: new Date(),
    });
    await this.khoaHocModel.updateOne(
      { _id: khoaHocId, 'Deadlines._id': deadlineId },
      {
        $push: {
          'Deadlines.$.Submissions': {
            SinhVienID: sinhVien._id,
            TaiLieu: taiLieu._id,
          },
        },
      },
    );

    return {
      message: 'Nộp bài thành công',
      submission: taiLieu,
    };
  }
  async deleteFile(taiLieuId: string, khoaHocId: string, user: any) {
    try {
      const taiLieu = await this.taiLieuModel.findById(taiLieuId).exec();
      if (!taiLieu)
        throw new NotFoundException(
          `Không tìm thấy tài liệu với ID ${taiLieuId}`,
        );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (user.role !== 'admin' && taiLieu.NguoiDang !== user.username) {
        throw new UnauthorizedException('Bạn không có quyền xóa tài liệu này');
      }
      const blobServiceClient = await this.getBlobServiceClient();
      const containerName = this.configService.get<string>(
        'AZURE_CONTAINER_NAME',
      );
      if (!containerName)
        throw new NotFoundException('Không tìm thấy container name');
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobName = taiLieu.LinkTaiLieu.split('/').pop()?.split('?')[0];
      if (!blobName) throw new BadRequestException('không tìm thấy blob');

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();

      await this.taiLieuModel.findByIdAndDelete(taiLieuId).exec();

      await this.khoaHocModel
        .updateOne({ _id: khoaHocId }, { $pull: { TaiLieu: taiLieuId } })
        .exec();

      return { success: true, message: 'Tài liệu đã được xóa thành công' };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      return { success: false, message: error.message };
    }
  }


  async getStudentSubmission(
    khoaHocId: string,
    deadlineId: string,
    username: string,
  ) {
    const sinhVien = await this.sinhVienModel.findOne({ mssv: username }).exec();
    if (!sinhVien) {
      throw new NotFoundException('Không tìm thấy sinh viên');
    }

    const khoaHoc = await this.khoaHocModel
      .findOne({
        _id: khoaHocId,
        SinhVienDangKy: sinhVien._id,
        'Deadlines._id': deadlineId,
      })
      .populate({
        path: 'Deadlines.Submissions.TaiLieu',
        select: 'TenTaiLieu LinkTaiLieu MoTa NguoiDang NgayTao',
      })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Không tìm thấy khóa học, deadline hoặc bạn chưa đăng ký');
    }

    const deadline = khoaHoc.Deadlines.find((d: any) => d._id.toString() === deadlineId);
    if (!deadline) {
      throw new NotFoundException('Không tìm thấy deadline');
    }

    const submission = deadline.Submissions.find(
      (s: any) => s.SinhVienID.toString() === (sinhVien as any)._id.toString(),
    );

    if (!submission) {
      return { message: 'Bạn chưa nộp bài cho deadline này', submission: null };
    }
    return { message: 'Lấy bài nộp thành công', submission: submission.TaiLieu };
  }

  async getStudentSubmissionsForDeadline(
    khoaHocId: string,
    deadlineId: string,
  ): Promise<{ message: string; submissions: TaiLieu[] }> {


    const khoaHoc = await this.khoaHocModel
      .findOne({
        _id: khoaHocId,
        'Deadlines._id': deadlineId,
      })
      .populate({
        path: 'Deadlines.Submissions.TaiLieu',
        select: 'TenTaiLieu LinkTaiLieu MoTa NguoiDang NgayTao',
      })
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException('Không tìm thấy khóa học, deadline hoặc bạn chưa đăng ký');
    }

    const deadline = khoaHoc.Deadlines.find((d: any) => d._id.toString() === deadlineId);
    if (!deadline) {
      throw new NotFoundException('Không tìm thấy deadline');
    }

    const submissions = deadline.Submissions.map((s: any) => s.TaiLieu);

    return {
      message: submissions.length > 0 ? 'Lấy danh sách bài nộp thành công' : 'Bạn chưa nộp bài',
      submissions,
    };
  }
}
