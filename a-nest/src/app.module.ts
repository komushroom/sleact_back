

import { Users } from './entities/Users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module,NestModule,MiddlewareConsumer, flatten } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { TypeORMError } from 'typeorm';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { AuthModule } from './auth/auth.module';

// import {};
console.log('gggggtgggggtgt',process.env);
@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }), 
    AuthModule,
    UsersModule, 
    WorkspacesModule, 
    ChannelsModule, 
    DmsModule,
    
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      // parseInt(process.env.DB_PORT)
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ],
      // autoLoadEntities :true,
      synchronize: false,
      logging :true,
      keepConnectionAlive: true,
      charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      WorkspaceMembers,
      ChannelMembers,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService,UsersService],
  
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
