import {AppInitialState, appSlice, setAppErrorAC, setAppStatusAC} from "app/appSlice";

describe('App Slice tests', () => {
  let initialState: AppInitialState

  beforeEach(() => {
    initialState = {
      status: 'loading',
      error: null
    }
  })


  test("App status should be changed to idle", () => {

    //action
    const stateAfterChange = appSlice(initialState, setAppStatusAC({status: 'idle'}))

    //expect
    expect(stateAfterChange.status).toBe('idle')

  })

  test("App error should be changed to there is nothing there", () => {

    //action
    const stateAfterChange = appSlice(initialState, setAppErrorAC({error: 'idle'}))

    //expect
    expect(stateAfterChange.error).toBe('idle')

  })
})