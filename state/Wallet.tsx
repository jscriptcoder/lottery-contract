import {
  useState,
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
  Context,
} from 'react'

export type WalletAddress = string
export type SetWalletState = Dispatch<SetStateAction<WalletAddress>>
export type UseWalletState = [WalletAddress, SetWalletState]

const initialWalletAddress: WalletAddress = ''
const initialUseSetWallet: SetWalletState = () => {}
const initialUseWalletState: UseWalletState = [
  initialWalletAddress,
  initialUseSetWallet,
]

export const WalletContext: Context<UseWalletState> = createContext(
  initialUseWalletState,
)

export function WalletContextProvider({ children }: PropsWithChildren) {
  return (
    <WalletContext.Provider value={useState(initialWalletAddress)}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  return useContext(WalletContext) as UseWalletState
}
