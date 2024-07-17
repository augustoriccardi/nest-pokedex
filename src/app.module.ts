import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // Importar ConfigModule para que pueda leer las variables de entorno. //!SIEMPRE ARRIBA
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    //Sirve contenido estático para peticiones al root ej: http://localhost:3000
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //1. Config Moongoose: https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb',
    }),

    // Inyecto los modulos que voy a utilizar en la aplicación
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor() {}
}
