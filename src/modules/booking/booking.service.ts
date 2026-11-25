import { Injectable, NotFoundException } from '@nestjs/common';
          import { InjectRepository } from '@nestjs/typeorm';
          import { Repository } from 'typeorm';
          import { Booking } from './booking.entity';
          import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

          @Injectable()
          export class BookingService {
            constructor(@InjectRepository(Booking) private readonly repo: Repository<Booking>) {}

            findAll() {
              return this.repo.find({ relations: ['user', 'guideprofile'], order: { id: 'DESC' } });
            }

            async findOne(id: number) {
              const item = await this.repo.findOne({ where: { id }, relations: ['user', 'guideprofile'] });
              if (!item) throw new NotFoundException('Booking not found');
              return item;
            }

            async create(dto: CreateBookingDto) {
              const data: any = { ...dto };
              data.user = { id: dto.userid };
    data.guideprofile = { id: dto.guideid };
              delete data.userid;
    delete data.guideid;
              return this.repo.save(this.repo.create(data));
            }

            async update(id: number, dto: UpdateBookingDto) {
              const item = await this.findOne(id);
              const data: any = { ...dto };
              if (dto.userid !== undefined) data.user = { id: dto.userid };
    if (dto.guideid !== undefined) data.guideprofile = { id: dto.guideid };
              delete data.userid;
    delete data.guideid;
              Object.assign(item, data);
              return this.repo.save(item);
            }

            async remove(id: number) {
              const item = await this.findOne(id);
              await this.repo.remove(item);
              return { deleted: true, id };
            }

            async count() {
              return { total: await this.repo.count() };
            }
          }
