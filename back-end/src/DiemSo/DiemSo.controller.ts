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
import { DiemSoService } from './DiemSo.service';
import { UpdateScoreDto } from './dto/update-Score.dto';
import { CreateScoreDto } from './dto/create-Score.dto';
import { ConfirmTestDto } from './dto/confirm-Test.dto';
import { SubmitTestDto } from './dto/submit-Test.dto';

@Controller('api/DiemSo')
export class DiemSoController {
  sinhVienModel: any;
  constructor(private readonly DiemSoService: DiemSoService) {}

  @Get('getListScorebyKhoaHocIDAndMSSV/:KhoaHocID')
  @UseGuards(JWTAuthGuard)
  async GetScoreByKhoaHocAndmssv(
    @Param('KhoaHocID') KhoaHocID: string,
    @Request() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role != 'student') {
      throw new UnauthorizedException(
        'Không có quyền truy cập bài kiểm tra này',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const mssv = req.user.username;

    const Score = await this.DiemSoService.getListScoreByKhoaHocAndMSSV(
      KhoaHocID,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mssv,
    );
    return Score;
  }

  @Get('getListScorebyKhoaHocIDAndMaGV/:KhoaHocID')
  @UseGuards(JWTAuthGuard)
  async getDiemSoById(
    @Param('KhoaHocID') KhoaHocID: string,
    @Request() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'teacher') {
      throw new UnauthorizedException(
        'Không có quyền truy cập bài kiểm tra này',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const magv = req.user.username;
    const Score = await this.DiemSoService.getListScorebyKhoaHocIDAndMaGV(
      KhoaHocID,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      magv,
    );
    return Score;
  }

  @Get('get_Test/:_id')
  @UseGuards(JWTAuthGuard)
  async getBaiKiemTraById(@Param('_id') _id: string, @Request() req: any) {
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      req.user.role !== 'admin' &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      req.user.role !== 'teacher' &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      req.user.role !== 'student'
    ) {
      throw new UnauthorizedException(
        'Không có quyền truy cập bài kiểm tra này',
      );
    }
    const Score = await this.DiemSoService.getScoreById(_id);
    return Score;
  }

  @Post('add_Score')
  @UseGuards(JWTAuthGuard)
  async addScore(@Body() createScoreDto: CreateScoreDto, @Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      throw new UnauthorizedException(
        'Không có quyền thêm Score cho sinh viên',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const MaGV = req.user.username;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newScore = await this.DiemSoService.addScore(createScoreDto, MaGV);

    return { message: 'Thêm thành công', newScore };
  }

  @Patch('update_Score/:_id')
  @UseGuards(JWTAuthGuard)
  async updateScore(
    @Param('_id') _id: string,
    @Body() updateScoreDto: UpdateScoreDto,
    @Request() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'teacher') {
      throw new UnauthorizedException(
        'Không có quyền cập nhật bài kiểm tra này',
      );
    }

    return this.DiemSoService.updateScore(
      _id,
      updateScoreDto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      req.user.username,
    );
  }

  @Delete('delete_Score/:MaKhoaHoc')
  @UseGuards(JWTAuthGuard)
  deleteScore(@Param('MaKhoaHoc') MaKhoaHoc: string, @Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException(
        'Không có quyền truy cập thông tin sinh viên này',
      );
    }
    return this.DiemSoService.deleteScoreByMaKhoaHoc(MaKhoaHoc);
  }

  @Patch('confirmTakingTest/:_id')
  @UseGuards(JWTAuthGuard)
  async confirmTakingTest(
    @Param('_id') _id: string,
    @Body() confirmTestDto: ConfirmTestDto,
  ) {
    return this.DiemSoService.confirmTakingTest(_id, confirmTestDto);
  }

  @Patch('submitTest/:_id')
  @UseGuards(JWTAuthGuard)
  async submitTest(
    @Param('_id') _id: string,
    @Body() submitTestDto: SubmitTestDto,
  ) {
    return this.DiemSoService.submitTest(_id, submitTestDto);
  }
}
