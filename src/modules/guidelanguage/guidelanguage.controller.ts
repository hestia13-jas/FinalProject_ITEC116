import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GuideLanguageService } from './guidelanguage.service';
import { CreateGuideLanguageDto, UpdateGuideLanguageDto } from './guidelanguage.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('guide-languages')
export class GuideLanguageController {
  constructor(private service: GuideLanguageService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get('count') count() { return this.service.count(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateGuideLanguageDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGuideLanguageDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
