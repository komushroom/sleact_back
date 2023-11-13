import { Body, Controller, Get, HttpException, Post, Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import {User} from 'src/common/decorators/user.decorator'
import { UndfinedToNullInterceptor } from 'src/common/interceptors/undefindToNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard'
 

@UseInterceptors(UndfinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiResponse({
        status: 200,
        description: '성공',
        type: UserDto,
    })

     @ApiResponse({
        status: 500,
        description: '서버 에러',
    })

    @ApiOperation({summary: '내 정보조회'})
    @Get()
    getUsers(@User() user){
        return user || false;
    }
    @UseGuards(new NotLoggedInGuard())
    @ApiOperation({summary: '회원가입'})
    @Post()
    async join(@Body() body: JoinRequestDto){
        await this.usersService.join(body.email, body.nickname, body.password);
        
    }

    @ApiResponse({
        status: 200,
        description: '성공',
        type: UserDto,
    })

    @ApiOperation({summary: '로그인'})
    @UseGuards(new LocalAuthGuard())
    @Post ('login')
    logIn(@User() user){
       return user;
    }

    @UseGuards(new LoggedInGuard())
    @ApiOperation({summary: '로그아웃'})
    @Post ('logout')
    logOut(@Req() req, @Res()res) {
        req.logOut();
        res.clearCookie('connect.sid',{httpOnly:true});
        res.send('ok');
    }
}
