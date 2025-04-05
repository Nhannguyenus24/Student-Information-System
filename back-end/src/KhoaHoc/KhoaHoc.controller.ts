import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { KhoaHocService } from './KhoaHoc.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { AddCourseDto } from 'src/KhoaHoc/dto/add-KhoaHoc.dto'
import { GetCourseListDto } from './dto/getListCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { Types } from 'mongoose';

@Controller('KhoaHoc')
export class KhoaHocController {
    constructor (
        private readonly khoaHocService: KhoaHocService,
    ){}

    @Get('getCourse/:MaKhoaHoc')
    @UseGuards(JWTAuthGuard)
    async getCourse(@Param('MaKhoaHoc') MaKhoaHoc: string)
    {

        try{
            console.log('Mã khóa học: ', MaKhoaHoc);
            // const KhoaHoc = await this.khoaHocService.getCourse(MaKhoaHoc);
            const KhoaHoc = await this.khoaHocService.getCourse(MaKhoaHoc);
            if (!KhoaHoc)
                throw new BadRequestException('Không tìm thấy khóa học.');
            return KhoaHoc;
        }catch(error)
        {
            return error;
        }
    }

    @Get('getCourseByID/:id')
    @UseGuards(JWTAuthGuard)
    async getCourseByID(@Param('id') id: string)
    {

        try{
            console.log('Mã khóa học: ', id);
            const KhoaHoc = await this.khoaHocService.getCourseByID(id);
            if (!KhoaHoc)
                throw new BadRequestException('Không tìm thấy khóa học.');
            return KhoaHoc;
        }catch(error)
        {
            return error;
        }
    }

    @Get('getRegisteredStudent/:MaKhoaHoc')
    @UseGuards(JWTAuthGuard)
    async getRegisteredStudent(@Param('MaKhoaHoc') MaKhoaHoc: string)
    {
        try{
            // console.log('Mã khóa học: ', MaKhoaHoc);
            // const KhoaHoc = await this.khoaHocService.getCourse(MaKhoaHoc);
            const details = await this.khoaHocService.getRegisteredStudent(MaKhoaHoc);
            if (!details)
                throw new BadRequestException('Không có sinh viên trong khóa học.');
            return details;
        }catch(error)
        {
            return error;
        }
    }
    
    @Get('getListCourse')
    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
    async getListCourse(@Query() query: GetCourseListDto)
    {
        try{
            console.log(query);
            
            return this.khoaHocService.getListCourse(query);
        }catch(error)
        {
            return error;
        }
    }

    @Post('addCourse')
    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async addCourse(@Req() req: any,@Body() body: AddCourseDto){
        try{
            if (req.user.role !== "Admin")
                throw new UnauthorizedException('Bạn không có quyền thực hiện thao tác này.');
            const KhoaHoc = await this.khoaHocService.addCourse(body);
            return {message: 'Khóa học đã được thêm thành công!', KhoaHoc};

        }catch(error){
            return error;
        }
    }
    
    @Put('updateCourse/:MaKhoaHoc')
    @UseGuards(JWTAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateCourse(@Req() req: any, @Param('MaKhoaHoc') MaKhoaHoc: string, @Body() updateKhoaHocDto: UpdateCourseDto){
        try{
            if (req.user.role !== "Admin")
                throw new UnauthorizedException('Bạn không có quyền thực hiện thao tác này.');
            console.log('Mã khóa học: ',MaKhoaHoc);
            return this.khoaHocService.updateCourse(MaKhoaHoc, updateKhoaHocDto);
        }catch(error){
            return error;
        }
    }

    @Delete('deleteCourse/:MaKhoaHoc')
    @UseGuards(JWTAuthGuard)
    async deleteCourse(@Req() req: any, @Param('MaKhoaHoc') MaKhoaHoc: string){
        try{
            
            if (req.user.role !== 'Admin')
                throw new UnauthorizedException('Bạn không có quyền xóa khóa học.');
            await this.khoaHocService.deleteCourse(MaKhoaHoc);
            return {code: 200, message: 'Khóa học đã được xóa thành công'};
        }catch(error)
        {
            return {message: error.message};
        }
    }

    @Get('searchCourse')
    @UseGuards(JWTAuthGuard)
    async searchCourse(@Query('query') query: string)
    {
        try{
            return this.khoaHocService.searchCourse(query);
        }catch(error)
        {
            return error;
        }
    }



    @Post('registerStudent/:MaKHoaHoc')
    @UseGuards(JWTAuthGuard)
    async registerStudent(@Param('MaKHoaHoc') MaKHoaHoc: string, @Req() req: any) {
        const username = req.user.username;
        // console.log(studentId);
        // const studentId = new Types.ObjectId(req.user.userId); // lấy ID sinh viên từ token

        return this.khoaHocService.registerStudentToCourse(MaKHoaHoc, username);
    }

    @Post('addStudentByAdmin/:MaKHoaHoc')
    @UseGuards(JWTAuthGuard)
    async addStudentByAdmin(@Param('MaKHoaHoc') MaKHoaHoc: string, @Body() body: { mssv: string }, @Req() req: any) {
        if (req.user.role !== 'Admin')
            throw new UnauthorizedException('Bạn không có quyền xóa khóa học.');
        console.log(MaKHoaHoc, body.mssv);
        return this.khoaHocService.addStudentToCourseByAdmin(MaKHoaHoc, body.mssv);
    }

    @Delete('removeStudentByAdmin/:MaKHoaHoc')
    @UseGuards(JWTAuthGuard)
    async removeStudentByAdmin(@Param('MaKHoaHoc') MaKHoaHoc: string, @Body() body: {mssv: string}, @Req() req: any) {
        if (req.user.role !== 'Admin')
            throw new UnauthorizedException('Bạn không có quyền xóa sinh viên khỏi khóa học.');
        return this.khoaHocService.removeStudentFromCourseByAdmin(MaKHoaHoc, body.mssv);
    }

    @Get('files/:khoaHocId')
    @UseGuards(JWTAuthGuard)
    async getFilesByKhoaHocId(@Req() req: any,@Param('khoaHocId') khoaHocId: string) {
        
        const files = await this.khoaHocService.getFilesByKhoaHocId(khoaHocId);
        return { message: 'Danh sách tài liệu của khóa học', files };
    }

    @Delete('removeFile/:khoaHocId/:taiLieuId')
    @UseGuards(JWTAuthGuard)
    async removeFile(@Req() req: any, @Param('khoaHocId') khoaHocId: string, @Param('taiLieuId') taiLieuId: string){
        
        try {
            if (req.user.role !== "Admin" && req.user.role !=="Teacher")
                throw new UnauthorizedException('Không có quyền thực hiện thao tác này')
            const result = await this.khoaHocService.deleteFile(khoaHocId, taiLieuId, req.user);
            return result;
        } catch (error) {
            return { message: error.message };
        }
    }
}