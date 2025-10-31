/**
 * FHEVM Solid.js context
 * 
 * @packageDocumentation
 */

import { createContext, useContext, createSignal, createEffect, onCleanup, type ParentComponent } from 'solid-js'
import { FHEVMClient } from '@fhevm-sdk/core'
import type { FHEVMConfig, NetworkInfo, WalletInfo } from '@fhevm-sdk/core'

/**
 * FHEVM context interface
 */
export interface FHEVMContextValue {
  client: () => FHEVMClient | null
  isInitialized: () => boolean
  network: () => NetworkInfo | null
  wallet: () => WalletInfo | null
  error: () => Error | null
}

const FHEVMContext = createContext<FHEVMContextValue>()

/**
 * FHEVM Provider props
 */
export interface FHEVMProviderOptions {
  config: FHEVMConfig
  autoInit?: boolean
  autoConnect?: boolean
}

/**
 * FHEVM Provider component
 * 
 * @example
 * ```tsx
 * import { FHEVMProvider } from '@fhevm-sdk/solid'
 * 
 * function App() {
 *   return (
 *     <FHEVMProvider config={{ chainId: 31337 }} autoInit>
 *       <Counter />
 *     </FHEVMProvider>
 *   )
 * }
 * ```
 */
export const FHEVMProvider: ParentComponent<FHEVMProviderOptions> = (props) => {
  const [client, setClient] = createSignal<FHEVMClient | null>(null)
  const [isInitialized, setIsInitialized] = createSignal(false)
  const [network, setNetwork] = createSignal<NetworkInfo | null>(null)
  const [wallet, setWallet] = createSignal<WalletInfo | null>(null)
  const [error, setError] = createSignal<Error | null>(null)

  async function initialize() {
    try {
      setError(null)

      const fhevmClient = new FHEVMClient()
      await fhevmClient.initialize(props.config)

      setClient(fhevmClient)
      setIsInitialized(true)
      setNetwork(fhevmClient.getNetwork())

      // Auto-connect if requested
      if (props.autoConnect && (window as any).ethereum) {
        try {
          const walletInfo = await fhevmClient.connectWallet((window as any).ethereum)
          setWallet(walletInfo)
        } catch (walletError) {
          console.warn('Auto-connect failed:', walletError)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Initialization failed'))
      throw err
    }
  }

  // Auto-initialize
  createEffect(() => {
    if (props.autoInit) {
      initialize().catch((err) => {
        console.error('FHEVM initialization failed:', err)
      })
    }
  })

  // Cleanup
  onCleanup(() => {
    // Cleanup if needed
  })

  const value: FHEVMContextValue = {
    client,
    isInitialized,
    network,
    wallet,
    error,
  }

  // Return provider without JSX to avoid type issues
  const Provider = FHEVMContext.Provider
  return Provider({ value, get children() { return props.children } })
}

/**
 * Use FHEVM context
 * 
 * @returns FHEVM context value
 * 
 * @throws {Error} If used outside FHEVMProvider
 * 
 * @example
 * ```tsx
 * import { useFHEVM } from '@fhevm-sdk/solid'
 * 
 * function Counter() {
 *   const { client, isInitialized, wallet } = useFHEVM()
 * 
 *   return (
 *     <Show when={isInitialized()}>
 *       <div>Wallet: {wallet()?.address}</div>
 *     </Show>
 *   )
 * }
 * ```
 */
export function useFHEVM(): FHEVMContextValue {
  const context = useContext(FHEVMContext)
  
  if (!context) {
    throw new Error('useFHEVM must be used within FHEVMProvider')
  }
  
  return context
}
