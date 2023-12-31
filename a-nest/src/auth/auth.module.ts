import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';

import { AuthService } from './auth.service';
import { LocalStrategye } from './local.strategy';
import { LocalSerializer } from './local.serializer';


@Module({
  imports: [
    PassportModule.register({ session: true}),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategye, LocalSerializer],
})
export class AuthModule {}