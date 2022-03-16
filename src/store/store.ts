import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux'
import { pokemonList } from './reducers/pokemonList';
const reducers = combineReducers({
    pokemons: pokemonList
})

//@ts-ignore
export const store = createStore(
    reducers,
    composeWithDevTools()
);