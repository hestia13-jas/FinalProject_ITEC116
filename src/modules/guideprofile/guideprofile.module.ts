import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuideProfile } from './guideprofile.entity';
import { GuideProfileService } from './guideprofile.service';
import { GuideProfileController } from './guideprofile.controller';
@Module({ imports: [TypeOrmModule.forFeature([GuideProfile])], controllers: [GuideProfileController], providers: [GuideProfileService] })
export class GuideProfileModule {}
