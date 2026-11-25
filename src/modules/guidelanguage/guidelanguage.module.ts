import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuideLanguage } from './guidelanguage.entity';
import { GuideLanguageService } from './guidelanguage.service';
import { GuideLanguageController } from './guidelanguage.controller';
@Module({ imports: [TypeOrmModule.forFeature([GuideLanguage])], controllers: [GuideLanguageController], providers: [GuideLanguageService] })
export class GuideLanguageModule {}
