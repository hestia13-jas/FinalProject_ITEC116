import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { GuideProfile } from '../guideprofile/guideprofile.entity';

          @Entity('bookings')
          export class Booking {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'TourDate', type: 'datetime' }) tourdate: Date;
@Column({ name: 'Status', type: 'varchar', length: 255 }) status: string;
@ManyToOne(() => User, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'UserID' }) user: User;
@ManyToOne(() => GuideProfile, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'GuideID' }) guideprofile: GuideProfile;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
