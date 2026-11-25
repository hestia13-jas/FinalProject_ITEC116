import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'LanguageName', type: 'varchar', length: 255 }) languagename: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
