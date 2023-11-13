// import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository, getDataSourceName } from '@nestjs/typeorm';
// import { Users } from 'src/entities/Users';
// import { DataSource, Repository } from 'typeorm';
// import bcrypt from 'bcrypt';
// import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
// import { ChannelMembers } from 'src/entities/ChannelMembers';
// import { error } from 'console';

// @Injectable()
// export class UsersService {
//     constructor(
//         @InjectRepository(Users)
//         private usersRepository: Repository<Users>,
//         @InjectRepository(WorkspaceMembers)
//         private workspaceMembersRepository: Repository<WorkspaceMembers>,
//         @InjectRepository(ChannelMembers)
//         private channlMembersRepository: Repository<ChannelMembers>,
//         private dataSource: DataSource,
//     ){}

//     getUser(){}
    

//     async join(email: string, nickname: string, password:string){
//         const queryRunner = this.dataSource.createQueryRunner();
//         await queryRunner.connect();
//         await queryRunner.startTransaction();    
//         const user = await queryRunner.manager
//         .getRepository(Users)
//         .findOne({where: {email}});

//         if (user) {
//             // 이미존재하는 유저라고 에러 
//             throw new UnauthorizedException ('이미존재하는 이메일입니다.')
//         }
//         const hashedPassword = await bcrypt.hash(password, 12);

//         try{
//         const returned = await queryRunner.manager.getRepository(Users)
//         .save({
//             email,
//             nickname,
//             password: hashedPassword,
//         });
//         throw new Error('롤백되나?')

//         const workspaceMember = queryRunner.manager
//         .getRepository(WorkspaceMembers)
//         .create();
//         workspaceMember.UserId = returned.id;
//         workspaceMember.WorkspaceId = 1;
//         await queryRunner.manager
//         .getRepository(WorkspaceMembers)
//         .save(workspaceMember);

//         await queryRunner.manager.getRepository(ChannelMembers).save({
//             UserID: returned.id,     
//             ChannelId: 1,
//         });
//         await queryRunner.commitTransaction();  
//         return true; 
//         } catch (error) {
//             console.error(error);
//             await queryRunner.rollbackTransaction();    
//             throw error;
//         } finally {
//             await queryRunner.release();
//         }
//     }
// }



import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}

  getUser() {}

  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new Error('이미 존재하는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: returned.id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}