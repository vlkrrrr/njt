import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);

    }
}
