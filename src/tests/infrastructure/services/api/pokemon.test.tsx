import pokemonsService from '../../../../infrastructure/services/api/pokemon';

describe("Pokemon services test", () => {
    test("should be an object", ( done ) => { 
        pokemonsService.getAll()
        .then((response=>{
            expect( typeof response === "object" ).toBe( true )
            done();
        }));

    });
    test("should get an error if the pokemon doesn't exist", ( done ) => { 
        pokemonsService.findById(1)
        .catch(( error )=>{
            const errorMessage = error.response.data.error
            expect( errorMessage ).toEqual("Not Found");
            done();
        });

    })
})