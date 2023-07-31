import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5437,
      username: 'postgres',
      password: 'Bao123456.',
      database: 'apis',
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
