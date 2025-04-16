import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  UnauthorizedException,
  UseGuards,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { UploadFileDto } from './dto/upload.dto';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(req.user.role);
    if (!file) throw new BadRequestException('Thiếu trường "file".');
    const { khoaHocId, moTa } = uploadFileDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'admin' && req.user.role !== 'teacher')
      throw new UnauthorizedException(
        'Không có quyền thêm tài liệu vào khóa học.',
      );

    const uploadedFile = await this.uploadService.uploadFile(
      file,
      khoaHocId,
      moTa,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req.user.username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req.user.role,
    );
    return { message: 'File uploaded successfully', file: uploadedFile };
  }

  @Post('avatar')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File,) {
    if (!file) throw new BadRequestException('Thiếu file.');
    if (req.user.role !== 'teacher') {
      throw new UnauthorizedException('Không có quyền upload ảnh giáo viên.');
    }

    const uploadedAvatar = await this.uploadService.uploadAvatar(
      file,
      req.user.username,
      req.user.role,
    );
    return { message: 'Avatar uploaded successfully', uploadedAvatar };
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
