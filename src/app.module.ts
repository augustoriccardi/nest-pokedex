import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      //Sirve contenido estático para peticiones al root ej: http://localhost:3000
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), //1. Config Moongoose: https://docs.nestjs.com/techniques/mongodb

    PokemonModule, CommonModule,
  ],
})
export class AppModule {}
