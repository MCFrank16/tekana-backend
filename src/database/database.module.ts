import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: configService.get('database.host'),
                    port: +configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    entities: configService.get('database.entities'),
                    migrations: configService.get('database.migrations'),
                    database: configService.get('database.db_name'),
                    synchronize: configService.get('database.db_sync')
                }
            }
        })
    ]
})
export class DatabaseModule { }
