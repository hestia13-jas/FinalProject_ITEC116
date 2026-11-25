import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto, UpdateLanguageDto } from './language.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('languages')
export class LanguageController {
  constructor(private service: LanguageService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get('count') count() { return this.service.count(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateLanguageDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLanguageDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
