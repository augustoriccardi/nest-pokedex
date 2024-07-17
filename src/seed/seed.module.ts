import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule, CommonModule], // importo el PokemonModule ( "MongooseModule" de pokemon.module.ts) y el CommonModule ("AxiosAdapter" de common.module.ts)
})
export class SeedModule {}
