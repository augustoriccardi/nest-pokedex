import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) //Inyecto el modelo de mongoose de Pokemon que importé en seed.module.ts, para hacer operaciones en la DB
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter, //Inyecto el adaptador que importé en seed.module que adapta la implementación del fetching de datos
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonsToInsert = data.results.map(({ name, url }) => ({
      name: name,
      no: url.split('/')[6],
    }));

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed executed';
  }
}
