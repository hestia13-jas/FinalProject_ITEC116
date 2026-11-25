import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private service: BookingService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get('count') count() { return this.service.count(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateBookingDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookingDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
