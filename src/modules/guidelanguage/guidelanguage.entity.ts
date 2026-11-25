import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GuideProfile } from '../guideprofile/guideprofile.entity';
import { Language } from '../language/language.entity';

          @Entity('guide_languages')
          export class GuideLanguage {
            @PrimaryGeneratedColumn() id: number;
@ManyToOne(() => GuideProfile, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'GuideID' }) guideprofile: GuideProfile;
@ManyToOne(() => Language, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'LanguageID' }) language: Language;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
