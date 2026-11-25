import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateGuideLanguageDto {
            @IsInt() @Min(1) guideid: number;
@IsInt() @Min(1) languageid: number;
          }
          export class UpdateGuideLanguageDto extends PartialType(CreateGuideLanguageDto) {}
