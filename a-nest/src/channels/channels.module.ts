import { Module } from '@nestjs/common';
// import { CoService } from './co/co.service';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
// CoService,
@Module({
  providers: [ ChannelsService],
  controllers: [ChannelsController]
})
export class ChannelsModule {}
