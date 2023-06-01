import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NousSommesModule } from './nous-sommes/nous-sommes.module';
import { MulterModule } from '@nestjs/platform-express';
import { NosServicesEtProduitsModule } from './nos-services-et-produits/nos-services-et-produits.module';
import { IntroductionNousRejoindreModule } from './introduction-nous-rejoindre/introduction-nous-rejoindre.module';
import { PosteModule } from './poste/poste.module';
import { ContactezNousModule } from './contactez-nous/contactez-nous.module';
import { SlideModule } from './slide/slide.module';
import { SlideTitleModule } from './slide-title/slide-title.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from './shared/shared.module';
import { WinstonModule } from 'nest-winston';
import { loggerConf } from './logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtTokenMiddleware, LoggerInterceptor } from './utils';
import { JWT_SECRET } from './utils/constant';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'smart',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    WinstonModule.forRoot(loggerConf),
    AuthModule,
    UsersModule,
    NousSommesModule,
    MulterModule.register({ dest: '/files' }),
    NosServicesEtProduitsModule,
    IntroductionNousRejoindreModule,
    PosteModule,
    ContactezNousModule,
    SlideModule,
    SharedModule,
    SlideTitleModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
