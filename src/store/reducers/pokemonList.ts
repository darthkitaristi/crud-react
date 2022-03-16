import { PokemonResponse } from "../../interfaces/pokemonInterface"

const pokemon:PokemonResponse[] =[];
const initialState = {
    data:pokemon,
}

export const pokemonList = ( state = initialState, action:any) =>{
    switch (action.type) {
        case '[pokemons] loadPokemons':
            return {data:action.payload}
        case '[pokemons] addPokemon':
            state.data.push(action.payload.pokemon)
            return {
                ...state,
                data:state.data
            }
        case '[pokemons] updatePokemon':
            return {
                ...state,
                data:state.data.map((pokemon:PokemonResponse)=> {
                    if (pokemon.id === action.payload.id ) {
                        return action.payload.pokemon
                    }else{
                        return pokemon
                    }
                })
            }
        case '[pokemons] deletePokemon':
            return {
                ...state,
                data:state.data.filter((pokemon:PokemonResponse)=> {
                    return pokemon.id !== action.payload
                })
            }
        default:
            return state;
    }
}