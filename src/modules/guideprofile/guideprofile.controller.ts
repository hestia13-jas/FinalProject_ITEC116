import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GuideProfileService } from './guideprofile.service';
import { CreateGuideProfileDto, UpdateGuideProfileDto } from './guideprofile.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('guide-profiles')
export class GuideProfileController {
  constructor(private service: GuideProfileService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get('count') count() { return this.service.count(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateGuideProfileDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGuideProfileDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
