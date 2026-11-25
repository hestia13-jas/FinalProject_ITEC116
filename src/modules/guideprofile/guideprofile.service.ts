import { Injectable, NotFoundException } from '@nestjs/common';
          import { InjectRepository } from '@nestjs/typeorm';
          import { Repository } from 'typeorm';
          import { GuideProfile } from './guideprofile.entity';
          import { CreateGuideProfileDto, UpdateGuideProfileDto } from './guideprofile.dto';

          @Injectable()
          export class GuideProfileService {
            constructor(@InjectRepository(GuideProfile) private readonly repo: Repository<GuideProfile>) {}

            findAll() {
              return this.repo.find({ relations: ['user'], order: { id: 'DESC' } });
            }

            async findOne(id: number) {
              const item = await this.repo.findOne({ where: { id }, relations: ['user'] });
              if (!item) throw new NotFoundException('GuideProfile not found');
              return item;
            }

            async create(dto: CreateGuideProfileDto) {
              const data: any = { ...dto };
              data.user = { id: dto.userid };
              delete data.userid;
              return this.repo.save(this.repo.create(data));
            }

            async update(id: number, dto: UpdateGuideProfileDto) {
              const item = await this.findOne(id);
              const data: any = { ...dto };
              if (dto.userid !== undefined) data.user = { id: dto.userid };
              delete data.userid;
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
