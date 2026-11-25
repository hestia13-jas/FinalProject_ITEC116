import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateBookingDto {
            @IsDateString() tourdate: Date;
@IsString() @IsNotEmpty() status: string;
@IsInt() @Min(1) userid: number;
@IsInt() @Min(1) guideid: number;
          }
          export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
