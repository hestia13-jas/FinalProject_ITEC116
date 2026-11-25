import { Injectable, NotFoundException } from '@nestjs/common';
          import { InjectRepository } from '@nestjs/typeorm';
          import { Repository } from 'typeorm';
          import { GuideLanguage } from './guidelanguage.entity';
          import { CreateGuideLanguageDto, UpdateGuideLanguageDto } from './guidelanguage.dto';

          @Injectable()
          export class GuideLanguageService {
            constructor(@InjectRepository(GuideLanguage) private readonly repo: Repository<GuideLanguage>) {}

            findAll() {
              return this.repo.find({ relations: ['guideprofile', 'language'], order: { id: 'DESC' } });
            }

            async findOne(id: number) {
              const item = await this.repo.findOne({ where: { id }, relations: ['guideprofile', 'language'] });
              if (!item) throw new NotFoundException('GuideLanguage not found');
              return item;
            }

            async create(dto: CreateGuideLanguageDto) {
              const data: any = { ...dto };
              data.guideprofile = { id: dto.guideid };
    data.language = { id: dto.languageid };
              delete data.guideid;
    delete data.languageid;
              return this.repo.save(this.repo.create(data));
            }

            async update(id: number, dto: UpdateGuideLanguageDto) {
              const item = await this.findOne(id);
              const data: any = { ...dto };
              if (dto.guideid !== undefined) data.guideprofile = { id: dto.guideid };
    if (dto.languageid !== undefined) data.language = { id: dto.languageid };
              delete data.guideid;
    delete data.languageid;
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
