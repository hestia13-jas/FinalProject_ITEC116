import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GuideProfileModule } from './modules/guideprofile/guideprofile.module';
import { LanguageModule } from './modules/language/language.module';
import { GuideLanguageModule } from './modules/guidelanguage/guidelanguage.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    // Loads .env into process.env and exposes ConfigService everywhere.
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: Number(config.get('DB_PORT') || 3306),
        username: config.get<string>('DB_USER') || 'root',
        password: config.get<string>('DB_PASSWORD') || '',
        database: config.get<string>('DB_NAME') || '05_ltgics_db',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UsersModule,
    AuthModule,
    GuideProfileModule, LanguageModule, GuideLanguageModule, BookingModule,
  ],
})
export class AppModule {}
