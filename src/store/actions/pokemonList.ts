import { PokemonResponse } from "../../interfaces/pokemonInterface";

export const setPokemons = (pokemonList:PokemonResponse[]) => ({ 
    type: '[pokemons] loadPokemons',
    payload: pokemonList,
})

export const addPokemon = (pokemon:PokemonResponse) => ({ 
    type: '[pokemons] addPokemon',
    payload: {pokemon},
})

export const refreshListPokemon = (id:number, pokemon:PokemonResponse) => ({
    type: '[pokemons] updatePokemon',
    payload: {
        id, pokemon
    }
})

export const deletePokemonOfList = (id:number) => ({
    type: '[pokemons] deletePokemon',
    payload: id
})