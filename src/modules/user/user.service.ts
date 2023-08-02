import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async getProfile(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['email', 'avatar', 'firstName', 'lastName'],
    });
  }
}
