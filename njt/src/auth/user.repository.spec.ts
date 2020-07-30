import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';

describe('UserRepository', () => {
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserRepository,
            ],
        }).compile()

        userRepository = await module.get<UserRepository>(UserRepository);
    })


})