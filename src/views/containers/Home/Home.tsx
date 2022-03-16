import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import pokemonsService from '../../../infrastructure/services/api/pokemon';
import { PokemonResponse } from "../../../interfaces/pokemonInterface";
import { setPokemons } from "../../../store/actions/pokemonList";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import SearchInput from "../../components/SearchInput/SearchInput";
import { Table } from "../../components/Table/Table";
import './Home.css';

export const Home = () => {

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [initialData, setInitialData] = useState({
		name:"",
		image:"",
		attack:50,
		defense:50,
		type:"water",
		hp:0,
		idAuthor:1
	})

	useEffect(() => {
		getAllPokemons();
	}, [])

	const getAllPokemons = () => {
		pokemonsService.getAll()
		.then((pokemons:any)=>{
			dispatch( setPokemons(pokemons) )
		})
		.catch((error)=>{
			console.log('error***', error);
		})
	}
  
	return (
		<Layout>
			<h3>Listado de Pokemon</h3>
			<div className="row">
				<SearchInput
					setInfo={(pokemon)=>{ 
						dispatch( dispatch( setPokemons(pokemon) ) )
					}}
				/>
				<button className="actionButton"
					onClick={() => {
						setShowModal(true);
						setModalTitle('Nuevo')
					}}>
					<i className="fa fa-plus"></i>
					Nuevo
				</button>
			</div>
			<Table />
			<Modal 
				title={modalTitle}
				show={showModal}
				onClose = { ()=>setShowModal(false)}
				initialData={initialData}
			/>
		</Layout>
	)
}
