import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

          @Entity('guide_profiles')
          export class GuideProfile {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'Bio', type: 'text', nullable: true }) bio: string;
@Column({ name: 'LicenseNumber', type: 'varchar', length: 255 }) licensenumber: string;
@Column({ name: 'Availability', type: 'varchar', length: 255 }) availability: string;
@ManyToOne(() => User, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'UserID' }) user: User;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
