import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateGuideProfileDto {
            @IsString() @IsOptional() bio: string;
@IsString() @IsNotEmpty() licensenumber: string;
@IsString() @IsNotEmpty() availability: string;
@IsInt() @Min(1) userid: number;
          }
          export class UpdateGuideProfileDto extends PartialType(CreateGuideProfileDto) {}
