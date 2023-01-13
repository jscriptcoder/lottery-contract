import {
  createContext,
  PropsWithChildren,
  Dispatch,
  useContext,
  Context,
  useReducer,
} from 'react'

export interface State {
  address: string
  balance: string
  isManager: boolean
  hasEntered: boolean
  participants: number
  contractBalance: string
}

export enum ActionType {
  UPDATE,
}

export interface Action {
  type: ActionType
  payload: Partial<State>
}

const initialState: State = {
  address: '',
  balance: '',
  isManager: false,
  hasEntered: false,
  participants: 0,
  contractBalance: '',
}

const noopDispatch: Dispatch<Partial<State>> = (value: Partial<State>) => {}

export const AppContext: Context<[State, Dispatch<Partial<State>>]> =
  createContext([initialState, noopDispatch])

function reducer(prevState: State, partialState: Partial<State>): State {
  if (partialState) {
    return {
      ...prevState,
      ...partialState,
    }
  }

  return prevState
}

export function AppContextProvider({ children }: PropsWithChildren) {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): [State, Dispatch<Partial<State>>] {
  return useContext(AppContext)
}
