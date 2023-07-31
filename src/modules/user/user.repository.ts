import { Injectable } from '@nestjs/common';
import { TypeORMRepository } from 'src/database/typeorm.repository';
import { User } from './user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserRepository extends TypeORMRepository<User> {
  constructor(manager: EntityManager) {
    super(User, manager);
  }
}
