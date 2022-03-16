import { useForm } from '../../../hooks/useForm';
import pokemonsService from '../../../infrastructure/services/api/pokemon';
import './Modal.css';
import { useDispatch } from "react-redux";
import { addPokemon, refreshListPokemon } from "../../../store/actions/pokemonList";
import { PokemonResponse } from '../../../interfaces/pokemonInterface';

interface Props {
    show:boolean,
    onClose: () => void,
    title:string,
    initialData:any,
}

const Modal = (props:Props) => {
    const dispatch = useDispatch()
    const { formData, onChange, resetForm, validateForm, emptyInputs } = useForm(props.initialData);
    const {name, image, attack, defense } = formData;
    
    const action = ()=>{
        if (props.initialData.id) {
            updatePokemon()
        }else{
            createPokemon()
        }
    }

    const createPokemon = () => {
        const errors = validateForm();
        if (errors.length===0) {
            pokemonsService.create(formData)
            .then((resp:any)=>{
                dispatch(addPokemon(resp))
                resetForm();
                props.onClose()
            })
            .catch((error)=>{
                console.log('error al crear***', error);
            })
        }
	}

    const updatePokemon = () => {
		const requestData = {
			name:formData.name,
			image:formData.image,
			attack:formData.attack,
			defense:formData.defense,
		}
        if (props.initialData) {
            pokemonsService.update(requestData, props.initialData.id)
            .then((resp:any)=>{
                const updatedPokemon:PokemonResponse = resp
                dispatch(refreshListPokemon(updatedPokemon.id, updatedPokemon))
                resetForm();
                props.onClose()
            })
            .catch((error)=>{
                console.log('error al editar pokemon***', error);
            })
        }
	}

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title} Pokemon</h4>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row-form">
                            <div className="col-form">
                                <label>Nombre:</label>
                                <input 
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    className={emptyInputs.name?'has-error':''}
                                />
                            </div>
                            <div className="col-form">
                                <label>Ataque: 0 </label>
                                <input 
                                    type="range" 
                                    name="attack" 
                                    value={attack}
                                    onChange={onChange}/>
                                <span> 100</span>
                            </div>
                        </div>
                        <div className="row-form">
                            <div className="col-form">
                            <label>Imagen:</label>
                                <input 
                                    type="text"
                                    name="image"
                                    placeholder="url"
                                    value={image}
                                    onChange={onChange}
                                    className={emptyInputs.image?'has-error':''}
                                />
                            </div>
                            <div className="col-form">
                                <label>Defensa: 0 </label>
                                <input 
                                    type="range" 
                                    name="defense" 
                                    value={defense}
                                    onChange={onChange}
                                />
                                <span> 100</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <div className="buttonsContainer">
                        <button 
                        className='actionButton'
                        onClick={()=>action()}>
                            <i className="fa fa-save"></i>
                            Guardar
                        </button>
                        <button 
                        className="actionButton"
                        onClick={()=>{
                                    props.onClose();
                                    resetForm();
                                }}>
                            <i className="fa fa-close"></i>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal