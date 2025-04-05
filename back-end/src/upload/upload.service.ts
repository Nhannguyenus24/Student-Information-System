// src/upload/upload.service.ts
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaiLieu } from 'src/schemas/TaiLieu.schema';
import { KhoaHoc } from 'src/schemas/KhoaHoc.schema';
import { v4 as uuidv4 } from 'uuid';
import { use } from 'passport';

@Injectable()
export class UploadService {
    constructor(
    private configService: ConfigService,
    @InjectModel(TaiLieu.name) private taiLieuModel: Model<TaiLieu>,
    @InjectModel(KhoaHoc.name) private khoaHocModel: Model<KhoaHoc>,
    ) {}

    private async getBlobServiceClient() {
        const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
        console.log('connection string: ', connectionString);
        if (!connectionString) throw new Error('Không tìm thấy AZURE_STORAGE_CONNECTION_STRING');
        return BlobServiceClient.fromConnectionString(connectionString);
    }

    async uploadFile(file: Express.Multer.File, khoaHocId: string, moTa: string, username: string): Promise<TaiLieu> {
        const blobServiceClient = await this.getBlobServiceClient();
        const containerName = this.configService.get<string>('AZURE_CONTAINER_NAME');
        if (!containerName) throw new NotFoundException('Không tìm thấy container name');
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        await blockBlobClient.uploadData(file.buffer);
        const fileUrl = blockBlobClient.url;

        const fileDoc = new this.taiLieuModel({
            TenTaiLieu: file.originalname,
            LinkTaiLieu: fileUrl,
            MoTa: moTa,
            TenNguoiDung: username  
        });
        const savedFile = await fileDoc.save();

        await this.khoaHocModel.updateOne(
            { _id: khoaHocId },
            { $push: { TaiLieu: savedFile._id } },
        );

        return savedFile;
    }

    async getFileById(id: string): Promise<TaiLieu> {
        const file = await this.taiLieuModel.findById(id).exec();
        if (!file) throw new NotFoundException(`Không tìm thấy tài liệu với ID ${id}`);
        return file;
    }

    // async getFilesByKhoaHocId(khoaHocId: string): Promise<TaiLieu[]> {
    //     console.log(khoaHocId);
    //     return this.taiLieuModel.find({ khoaHocId }).exec();
    // }

    async deleteFile(taiLieuId: string, khoaHocId: string, user: any): Promise<void> {
        const taiLieu = await this.taiLieuModel.findById(taiLieuId).exec();
        if (!taiLieu) throw new NotFoundException(`Không tìm thấy tài liệu với ID ${taiLieuId}`);
        if (user.role !== 'Admin' && taiLieu.TenNguoiDung !== user.username) {
            throw new UnauthorizedException('Bạn không có quyền xóa tài liệu này');
          }
        const blobServiceClient = await this.getBlobServiceClient();
        const containerName = this.configService.get<string>('AZURE_CONTAINER_NAME');
        if (!containerName)
            throw new NotFoundException('Không tìm thấy container name');
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobName = taiLieu.LinkTaiLieu.split('/').pop()?.split('?')[0];
        if (!blobName)
            throw new BadRequestException('không tìm thấy blob');

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.deleteIfExists();
    
        await this.taiLieuModel.findByIdAndDelete(taiLieuId).exec();
    
        await this.khoaHocModel.updateOne(
            { _id: khoaHocId },
            { $pull: { TaiLieu: taiLieuId } },
          ).exec();
    }
}