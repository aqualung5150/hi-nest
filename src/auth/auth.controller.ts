import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from './42-auth.guard';

@Controller('auth')
export class AuthController {

    @Get('login')
    @UseGuards(FortyTwoAuthGuard)
    async getLogin(@Req() req) {
        return 'success'
    }

    @Get('callback')
    @UseGuards(FortyTwoAuthGuard)
    async getCallback(@Req() req, @Res() res) {
        return res.redirect('/');
    }
}
