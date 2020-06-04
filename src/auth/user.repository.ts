import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        }catch (error){
            if (error.code === '23505') {// duplicate username
  
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }


        }

    }
}