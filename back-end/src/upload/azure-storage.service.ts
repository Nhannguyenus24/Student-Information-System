// import { Injectable } from '@nestjs/common';
// import { BlobServiceClient } from '@azure/storage-blob';
// import * as multer from 'multer';
// import * as stream from 'stream';

// @Injectable()
// export class AzureStorageService {
//   private blobServiceClient: BlobServiceClient;
//   private containerClient;

//   constructor() {
//     // Cấu hình thông tin kết nối với Azure Storage Account
//     this.blobServiceClient = BlobServiceClient.fromConnectionString(
//       process.env.AZURE_STORAGE_CONNECTION_STRING,  // Cung cấp Connection String từ .env
//     );
//     this.containerClient = this.blobServiceClient.getContainerClient(
//       process.env.AZURE_STORAGE_CONTAINER_NAME,  // Tên container của bạn
//     );
//   }

//   // Cấu hình multer để tải lên file và lưu trữ vào Azure Blob Storage
//   getMulterStorage() {
//     return multer({
//       storage: multer.memoryStorage(),  // Sử dụng bộ nhớ để lưu file tạm thời
//       limits: { fileSize: 100 * 1024 * 1024 },  // Giới hạn kích thước file, 100 MB trong ví dụ này
//     });
//   }

//   // Upload file lên Azure Blob Storage
//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     const blobClient = this.containerClient.getBlockBlobClient(file.originalname);

//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(file.buffer);  // Đẩy buffer của file vào stream

//     // Tải lên file
//     await blobClient.uploadStream(bufferStream, file.buffer.length);

//     // Trả về URL của file trên Azure Blob Storage
//     return `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${file.originalname}`;
//   }
// }
