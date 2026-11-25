import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateLanguageDto {
  @IsString() @IsNotEmpty() languagename: string;
}
export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}
