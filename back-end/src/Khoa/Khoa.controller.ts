import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { updateKhoaDTO } from './dto/updateKhoa.dto';
import { getFacultyListDTO } from './dto/getFacultyList.dto';
import { addKhoaDTO } from './dto/addKhoa.dto';
import { KhoaService } from './Khoa.service';



@Controller('api/Khoa')
export class KhoaController {
  constructor(private readonly khoaService: KhoaService) {}

  @Post('addFaculty')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  async addFaculty(@Req() req: any, @Body() addKhoa: addKhoaDTO) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (req.user.role !== 'admin')
        throw new UnauthorizedException(
          'Bạn không có quyền thực hiện thao tác này.',
        );
      const khoa = await this.khoaService.addFaculty(addKhoa.TenKhoa);
      return { message: 'Khoa đã được thêm thành công!', khoa };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  @Get('getFaculty/:MaKhoa')
  @UseGuards(JWTAuthGuard)
  async getFaculty(@Param('MaKhoa') MaKhoa: string) {
    try {
      const khoa = await this.khoaService.getFaculty(MaKhoa);
      if (!khoa) throw new BadRequestException('Không tìm thấy khoa.');
      return khoa;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  @Get('getFacultyByID/:id')
  @UseGuards(JWTAuthGuard)
  async getFacultyByID(@Param('id') id: string) {
    try {
      const khoa = await this.khoaService.getFacultyByID(id);
      if (!khoa) throw new BadRequestException('Không tìm thấy khoa.');
      return khoa;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  @Get('getListFaculty')
  @UseGuards(JWTAuthGuard)
  async getListFaculty(@Query() query: getFacultyListDTO) {
    try {
      return this.khoaService.getListFaculty(query);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  @Delete('deleteFaculty/:MaKhoa')
  @UseGuards(JWTAuthGuard)
  async deleteFaculty(@Req() req: any, @Param('MaKhoa') MaKhoa: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (req.user.role !== 'admin')
        throw new UnauthorizedException(
          'Bạn không có quyền thực hiện thao tác này.',
        );
      const khoa = await this.khoaService.deleteFaculty(MaKhoa);
      return { message: 'Khoa đã được xóa thành công!', khoa };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }

  @Put('updateFaculty/:MaKhoa')
  @UseGuards(JWTAuthGuard)
  @UsePipes(new ValidationPipe())
  async updateFaculty(
    @Req() req: any,
    @Param('MaKhoa') MaKhoa: string,
    @Body() updateDTO: updateKhoaDTO,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (req.user.role !== 'admin')
        throw new UnauthorizedException(
          'Bạn không có quyền thực hiện thao tác này.',
        );
      return this.khoaService.updateFaculty(MaKhoa, updateDTO);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return error;
    }
  }
}
