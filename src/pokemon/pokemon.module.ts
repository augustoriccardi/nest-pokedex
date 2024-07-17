import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    // Para usar las variables de entorno configuradas en el app.config.ts tengo que importar el modulo ConfigModule.
    ConfigModule,
    // 3. Config Moongoose
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule], // Cuando exporto es solo el MongooseModule que se creó en la config del imports. Es lo que voy a importar desde el seed.module.ts.
})
export class PokemonModule {}
