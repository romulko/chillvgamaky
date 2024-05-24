import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'test'
          ? ['.env.test']
          : ['.env.local', '.env.prod'],
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          process.env.NODE_ENV === 'test'
            ? 'src/**/*.entity.ts'
            : 'dist/**/*.entity.js',
        ],
        synchronize: true,
        autoLoadModels: true,
        // logging: false,
      }),
    }),

    OrderModule,
  ],
})
export class AppModule {}
