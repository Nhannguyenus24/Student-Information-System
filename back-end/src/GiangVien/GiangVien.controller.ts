import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GiangVienService } from './GiangVien.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { UpdateGiangVienDto } from './dto/update-giangvien.dto';
import { AddTeacherDto } from './dto/add-giangvien.dto';
import { GetTeacherListDto } from './dto/getListGiangVien.dto';

@Controller('GiangVien')
export class GiangVienController {
    constructor(
        private readonly GiangVienService: GiangVienService,
        private readonly AuthService: AuthService,
    ){}

    @Get('searchTeacher')
    @UseGuards(JWTAuthGuard)
    async searchTeacher(@Query('query') query: string)
    {
        try{
            // if (!query)
            //     throw new BadRequestException('Vui lòng nhập tên hoặc mã số của giảng viên.')
            return this.GiangVienService.searchTeacher(query);
        }catch(error)
        {
            return error;
        }
    }

    @Get('getTeacher/:MaGV')
    @UseGuards(JWTAuthGuard)
    async getTeacher(@Param('MaGV') MaGV: string){
        console.log('Giao vien: ',MaGV);
        const giangVien = await this.GiangVienService.getTeacher(MaGV);
        if (!giangVien)
            throw new NotFoundException('Giảng viên không tồn tại.');
        return giangVien;
    }
    
    @Get('getListTeacher')
    @UseGuards(JWTAuthGuard)
    async getTeacherList(@Query() query: GetTeacherListDto) {
        return this.GiangVienService.getTeacherList(query);
    }


    @Post('addTeacher')
    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe())
    async addTeacher(@Req() req: any,@Body() body: AddTeacherDto)
    {
        try 
        {
            console.log(req);
            console.log("role: ",req.user.role)
            if (req.user.role !== "Admin")
                throw new UnauthorizedException('Bạn không có quyền thực hiện thao tác này.');
            const username = await this.GiangVienService.generateUsername(body.HoTen);
            const email = `${username}@student.hcmus.edu.vn`;
            const password = username;
            const role = 'Teacher';
            const registrationResult = await this.AuthService.register(
                username,
                email,
                password,
                role,
              ); 
            const newGiaoVien = await this.GiangVienService.addTeacher(username, body.HoTen, body.ChucVu, body.KhoaID);
            return { message: "Giảng viên đã được thêm thành công!", newGiaoVien };

        } catch(error)
        {
            throw error;
        }
    }

    @Delete('deleteTeacher/:MaGV')
    @UseGuards(JWTAuthGuard)
    async deleteTeacher(@Req() req: any, @Param('MaGV') MaGV: string){
        try{
            
            if (req.user.role !== 'Admin')
                throw new UnauthorizedException('Bạn không có quyền xóa giáo viên.');
            await this.GiangVienService.deleteTeacher(MaGV);
            return {message: 'Giảng viên đã được xóa thành công'};
        }catch(error)
        {
            return {message: error.message};
        }

    }

    @Put('updateTeacher/:MaGV')
    @UseGuards(JWTAuthGuard)
    async updateTeacher(@Param('MaGV') MaGV: string, @Body() updateGiangVienDto: UpdateGiangVienDto,) {
        return this.GiangVienService.updateTeacher(MaGV, updateGiangVienDto);
    }

    @Get('getTeacherNoti')
    @UseGuards(JWTAuthGuard)
    async getTeacherNoti(@Req() req: any) {
        try{
            if (req.user.role != 'Teacher')
                throw new UnauthorizedException('Bạn không có quyền lấy thông báo từ giáo viên.')
            return this.GiangVienService.getTeacherNoti(req.user.username);

        }catch(error)
        {
            return {message: error.message};
        }
    }

}
