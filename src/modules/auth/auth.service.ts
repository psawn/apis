import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { SignInDto, SignUpDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const duplicateEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (duplicateEmail) {
      throw new BadRequestException('Email already exists');
    }

    const salt = bcrypt.genSaltSync();
    const hasPassword = bcrypt.hashSync(password, salt);

    await this.userRepository.insert({
      email,
      password: hasPassword,
    });
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return await this.generateJWT(user);
  }

  async generateJWT(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'secret',
      expiresIn: '3600s',
    });

    return { accessToken };
  }
}
