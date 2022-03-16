import { POKEMONS_ENDPOINTS } from "../../../constants/constants";
import { PokemonResponse } from "../../../interfaces/pokemonInterface";
import API from "../config";
  
const pokemonsService = {
    getAll: () => new Promise(
            (resolve,reject) => {
            API.get(POKEMONS_ENDPOINTS.LIST_POKEMONS)
            .then(
                res => res.data
            )
            .then((data:PokemonResponse[]) => {resolve(data)}
            )
            .catch(
                err => reject(err)
            )
        }
    ),
    create: (data:any) => new Promise(
        (resolve,reject) => {
            API.post(POKEMONS_ENDPOINTS.LIST_POKEMONS, data)
            .then(res => res.data)
            .then((data:PokemonResponse) => resolve(data))
            .catch(
                err => reject(err)
            )
        }
    ),
    delete: (id:number) => new Promise(
        (resolve,reject) => {
            API.delete(POKEMONS_ENDPOINTS.POKEMON+id)
            .then(res => res.data)
            .then((data) => resolve(data))
            .catch(
                err => reject(err)
            )
        }
    ),
    update: (payload:any, id:number) => new Promise(
        (resolve,reject) => {
            API.put(POKEMONS_ENDPOINTS.POKEMON+id, payload)
            .then(res => res.data)
            .then((data) => resolve(data))
            .catch(
                err => reject(err)
            )
        }
    ),
    findById: ( id:number) => new Promise(
        (resolve,reject) => {
            API.get( POKEMONS_ENDPOINTS.POKEMON+id )
            .then(res => res.data)
            .then((data) => resolve(data))
            .catch(
                err => reject(err)
            )
        }
    )
}
      
export default pokemonsService;
