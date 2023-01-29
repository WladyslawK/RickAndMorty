//types import
import {CharactersInitialStateType, charactersSlice, setCharactersAC, setQueryParamsAC} from "features/allCharactersPage/charactersSlice"


describe('Characters Slice tests', () => {
  let initialState: CharactersInitialStateType

  beforeEach(() => {
    initialState = {
      characters: [],
      queryParams: {
        page: '1',
        name: '',
        status: '',
        species: ''
      },
      pages: '',
    }
  })


  test("List of characters and pages value should be set correctly", () => {


    const charactersList = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1"
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3"
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: [],
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z"
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "unknown",
          url: ""
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3"
        },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: [],
        url: "https://rickandmortyapi.com/api/character/2",
        created: "2017-11-04T18:50:21.651Z"
      },
      {
        id: 3,
        name: "Summer Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Female",
        origin: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        },
        location: {
          name: "Earth (Replacement Dimension)",
          url: "https://rickandmortyapi.com/api/location/20"
        },
        image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        episode: [],
        url: "https://rickandmortyapi.com/api/character/3",
        created: "2017-11-04T19:09:56.428Z"
      },
    ]

    //action
    const charactersAfterSet = charactersSlice(initialState, setCharactersAC({characters: charactersList, pages: '42'}))

    //expect
    expect(charactersAfterSet.pages).toBe('42')
    expect(charactersAfterSet.characters[0].name).toBe("Rick Sanchez")
    expect(charactersAfterSet.characters[2].name).toBe("Summer Smith")
  })


  test('Query params should be set correctly', () => {

    const queryParams = {
      page: '1',
      name: 'Morty',
      status: 'Alive',
      species: 'Human'
    }

    //action
    const charactersAfterSet = charactersSlice(initialState, setQueryParamsAC({queryParams}))

    //expect
    expect(charactersAfterSet.queryParams.page).toBe('1')
    expect(charactersAfterSet.queryParams.species).toBe("Human")
    expect(charactersAfterSet.queryParams.name).toBe("Morty")

  })

})