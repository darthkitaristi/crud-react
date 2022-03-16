import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pokemonsService from '../../../infrastructure/services/api/pokemon';
import { PokemonResponse } from '../../../interfaces/pokemonInterface';
import Modal from '../Modal/Modal';
import './Table.css';
import { deletePokemonOfList } from "../../../store/actions/pokemonList";
  
export const Table = () => {
    const dispatch = useDispatch();
    const pokemonsList:any = useSelector((state:any) => state.pokemons);
    const [windowHeight, setWindowHeight] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [initialData, setInitialData] = useState<any>(null)

    useEffect(() => {
        setWindowHeight(window.innerHeight)
    }, [])
    
    const editPokemon = (pokemon:PokemonResponse) => {
		setShowModal(true)
        setInitialData(pokemon)
	}
    
    const deletePokemon = (id:number)=>{
        pokemonsService.delete(id)
        .then((resp:any)=>{
           dispatch( deletePokemonOfList(id) )
        })
        .catch((error)=>{
            console.log('error al eliminar***', error);
        })
    }

    const PokeModal = ()=>{
        return (
            <Modal
                title="Editar"
                show={showModal}
                onClose = { ()=>setShowModal(false)}
                initialData = {initialData}
            />
        )
    }


    return (
        <div style={{height:windowHeight-150, overflow:'auto'}}>
            <table>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Ataque</th>
                        <th>Defensa</th>
                        <th>Acciones</th>
                    </tr>
                {pokemonsList.data.length>0?(
                <>
                    {pokemonsList.data.map((pokemon:PokemonResponse, key:any) => {
                        return (
                            <tr key={key}>  
                                <td className='actionsCell'>{pokemon.id}</td>
                                <td className='actionsCell'>{pokemon.name}</td>
                                <td>
                                    {pokemon?.image ? 
                                    (<img className="imageTable" src={pokemon.image} />) 
                                    : <i className="fa fa-image pokemonImage" title="Imagen no disponible"></i>}
                                    
                                </td>
                                <td>{pokemon.attack}</td>
                                <td>{pokemon.defense}</td>
                                <td className="actionsCell">
                                    <div className="actions">
                                        <i className="fa fa-edit" title="Editar" onClick={()=>editPokemon(pokemon)}></i>
                                        <i className="fa fa-trash" title="Eliminar" onClick={()=>deletePokemon(pokemon.id)}></i>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </>
                ):(
                    <tr>
                        <td colSpan={6}>
                            No hay datos para mostrar
                        </td>
                    </tr>
                )}
                
         </table>
        {showModal ? <PokeModal/>:null}
        </div>

    );
}
