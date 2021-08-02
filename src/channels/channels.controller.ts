import { Controller, Get, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(
    private channelsService: ChannelsService,
    private reflector: Reflector,
  ) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getMany() {
    return this.channelsService.getMany();
  }
}
