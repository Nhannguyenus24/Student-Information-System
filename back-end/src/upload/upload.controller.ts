import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Body, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

    @Post()
    @UseGuards(JWTAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Req() req: any,
        @UploadedFile() file: Express.Multer.File,
        @Body('khoaHocId') khoaHocId: string,
        @Body('moTa') moTa: string,
    ) {
        console.log(moTa);
        if (req.user.role === "Admin" || req.user.role === "Teacher")
        {
            const uploadedFile = await this.uploadService.uploadFile(file, khoaHocId, moTa, req.user.username);
            return { message: 'File uploaded successfully', file: uploadedFile };
        }
        else throw new UnauthorizedException('Không có quyền thêm tài liệu vào khóa học.');
    }

    @Get(':id')
    @UseGuards(JWTAuthGuard)
    async getFileById(@Param('id') id: string) {
        const file = await this.uploadService.getFileById(id);
        return { file };
    }

    // @Get('KhoaHoc/:khoaHocId')
    // @UseGuards(JWTAuthGuard)
    // async getFilesByKhoaHocId(@Param('khoaHocId') khoaHocId: string) {
    //     const files = await this.uploadService.getFilesByKhoaHocId(khoaHocId);
    //     return { files };
    // }
}