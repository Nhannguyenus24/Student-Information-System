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
import { KhoaHoc, KhoaHocDocument } from 'src/schemas/KhoaHoc.schema';
import { v4 as uuidv4 } from 'uuid';
import { GiangVien, GiangVienDocument } from 'src/schemas/GiangVien.schema';

@Injectable()
export class UploadService {
  constructor(
    private configService: ConfigService,
    @InjectModel(TaiLieu.name) private taiLieuModel: Model<TaiLieuDocument>,
    @InjectModel(KhoaHoc.name) private khoaHocModel: Model<KhoaHocDocument>,
    @InjectModel(GiangVien.name) private readonly giangVienModel: Model<GiangVienDocument>,
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
      .populate('GiangVienID TroGiangID')
      .exec();
    if (!khoaHoc) {
      throw new NotFoundException(
        `Không tìm thấy khóa học với ID ${khoaHocId}`,
      );
    }
    if (role !== 'admin') {
      const giangVien = khoaHoc.GiangVienID as unknown as GiangVienDocument;
      const troGiang = khoaHoc.TroGiangID as unknown as
        | GiangVienDocument
        | undefined;

      const isGiangVien = giangVien && giangVien.MaGV === username;
      const isTroGiang = troGiang && troGiang.MaGV === username;
      if (!isGiangVien && !isTroGiang) {
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
}
