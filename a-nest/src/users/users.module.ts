import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/entities/Users';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { channel } from 'diagnostics_channel';
import { ChannelMembers } from 'src/entities/ChannelMembers';


@Module({
  imports :[TypeOrmModule.forFeature( [ Users, WorkspaceMembers, ChannelMembers ])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
