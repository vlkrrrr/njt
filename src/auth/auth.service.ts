import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {
    private logger = new Logger('authserv');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialsDto: AuthCredentialDto): Promise<void>{
            await this.userRepository.signUp(authCredentialsDto);
    }
    
    async signIn(authCredentialsDto: AuthCredentialDto): Promise<{accessToken: string}> {
            const username = await this.userRepository.validateUserPassword(authCredentialsDto);
            
            if (!username) {
                throw new UnauthorizedException('Invalid Credentials');
            }

            const payload: JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload);
            this.logger.debug(`generatetd `)
            return { accessToken };
    }

}
