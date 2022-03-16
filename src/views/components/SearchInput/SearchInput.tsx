
import { useForm } from '../../../hooks/useForm';
import pokemonsService from '../../../infrastructure/services/api/pokemon';
import { PokemonResponse } from '../../../interfaces/pokemonInterface';
import './SearchInput.css';

interface Props {
  setInfo:( pokemon:PokemonResponse[] )=>void
}

const SearchInput = ({setInfo}:Props) => {
  const { formData, onChange } = useForm({
    inputData:""
  });

  const search = (event:any)=>{
    event.preventDefault();
    if (formData.inputData!=="") {
      pokemonsService.findById(formData.inputData)
      .then((resp:any)=>{
            setInfo([resp])
      })
      .catch((error)=>{
        setInfo([])
      })
    }
  }

  return (
    <div className='row'>
        <form onSubmit={search}>
            <div className='icon-inside'>
                <i className="fa fa-search icon"></i>
                <input
                    type="text"
                    placeholder="Buscar"
                    className="input-field"
                    name="inputData"
                    value={formData.inputData}
                    onChange={onChange}
                />
            </div>
        </form>
    </div>
  )
}

export default SearchInput