import {
  Controller,
  Param,
  UnauthorizedException,
  UseGuards,
  Request,
  Get,
  Body,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { LichService } from './Lich.service';
import { CreateAndUpdateLichDto } from './dto/create&update-Lich.dto';

@Controller('api/Lich')
export class LichController {
  constructor(private readonly LichService: LichService) {}

  @Get('get_calendarbyMSSV/:mssv')
  @UseGuards(JWTAuthGuard)
  async GetcalendarByMSSV(@Param('mssv') mssv: string, @Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'admin' && req.user.username !== mssv) {
      throw new UnauthorizedException(
        'Không có quyền xem thông tin sinh viên này',
      );
    }
    const calendar = await this.LichService.getcalendarByMSSV(mssv);
    return calendar;
  }

  @Post('add_calendar')
  @UseGuards(JWTAuthGuard)
  async addcalendar(@Body() createcalendarDto: CreateAndUpdateLichDto) {
    const newcalendar = await this.LichService.addcalendar(createcalendarDto);

    return { message: 'Thêm thành công', newcalendar };
  }

  @Patch('update_calendar/:_id')
  @UseGuards(JWTAuthGuard)
  async updatecalendar(
    @Param('_id') _id: string,
    @Body() updatecalendarDto: CreateAndUpdateLichDto,
    @Request() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'student') {
      throw new UnauthorizedException('Không có quyền cập nhật lịch');
    }

    return this.LichService.updatecalendar(_id, updatecalendarDto);
  }

  @Delete('delete_calendar/:mssv')
  @UseGuards(JWTAuthGuard)
  deletecalendar(@Param('mssv') mssv: string, @Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Không có quyền xóa thông tin này');
    }
    return this.LichService.deletecalendarByMSSV(mssv);
  }
}
