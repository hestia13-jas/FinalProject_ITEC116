import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
@Module({ imports: [TypeOrmModule.forFeature([Language])], controllers: [LanguageController], providers: [LanguageService] })
export class LanguageModule {}
