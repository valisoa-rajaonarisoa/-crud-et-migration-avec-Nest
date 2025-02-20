import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ce paramètre permet de rendre les variables d'environnement globales
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importer le ConfigModule pour accéder aux variables d'environnement
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false), // Ne pas utiliser 'true' en production
        autoLoadEntities:true
      }),
      inject: [ConfigService], // Injection du service de configuration
    }),
  ],
})
export class DatabaseModule {}
