import {CharacterInitialStateType, characterSlice, setCharacterAC} from "./characterSlice"


describe('Character Slice tests', () => {
  let initialState: CharacterInitialStateType

  beforeEach(() => {
    initialState = {
      character: {
        id: 0,
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: {
          "name": '',
          "url": '',
        },
        location: {
          "name": '',
          "url": '',
        },
        image: '',
        episode: [],
        url: '',
        created: ''
      }
    }
  })


  test("Character info should be set correctly", () => {

    const character = {
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
    }

    //action
    const stateAfterChange = characterSlice(initialState, setCharacterAC({character}))

    //expect
    expect(stateAfterChange.character.name).toBe('Rick Sanchez')
    expect(stateAfterChange.character.id).toBe(1)
    expect(stateAfterChange.character.species).toBe('Human')

  })
})