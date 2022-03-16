
import SearchInput from '../../../views/components/SearchInput/SearchInput';
import { shallow } from 'enzyme';

describe("Tests in <SearchInput />", () => {
    const setInfo = jest.fn

    let component = shallow(<SearchInput setInfo={setInfo} />);
    beforeEach(()=>{
        component = shallow(<SearchInput setInfo={setInfo} />);
        jest.clearAllMocks();
    })

    test('should exist', () => { 
        expect( component ).toMatchSnapshot();
    })

    test('search input value should start empty', () => { 
        const searchInput = component.find('input')
        const inputValue = searchInput.getElement().props.value;
        expect(inputValue).toEqual("");
     })

     test('should not search if field is empty', () => { 
         component.find('form').simulate('submit', { preventDefault(){} })
         expect( setInfo() ).not.toBeCalled();
      })
});
