import { shallow } from 'enzyme';
import { Table } from '../../../views/components/Table/Table';

describe("Tests in <Table />", () => {
    test('should exist', () => { 
        const component = shallow(<Table />);
        expect( component ).toMatchSnapshot();
    })
});
