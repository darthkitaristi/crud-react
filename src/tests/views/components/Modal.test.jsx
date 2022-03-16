import Modal from '../../../views/components/Modal/Modal';
import { shallow } from 'enzyme';

describe("Tests in <Modal />", () => {
    test('should exist', () => { 
        const initialData = {
            name:"",
            image:"",
            attack:50,
            defense:50,
            type:"water",
            hp:0,
            idAuthor:1
        }
        const component = shallow(<Modal initialData={initialData}/>);
        expect( component ).toMatchSnapshot();
    })
});
