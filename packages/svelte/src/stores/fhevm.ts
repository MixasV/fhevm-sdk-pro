/**
 * FHEVM Svelte stores
 * 
 * @packageDocumentation
 */

import { derived, writable, type Readable, type Writable } from 'svelte/store'

import { FHEVMClient, type FHEVMConfig, type NetworkInfo, type WalletInfo } from '@fhevm-sdk/core'

/**
 * FHEVM client store
 */
export const fhevmClient: Writable<FHEVMClient | null> = writable(null)

/**
 * Initialization state store
 */
export const isInitialized: Readable<boolean> = derived(
  fhevmClient,
  ($client) => $client?.isInitialized() ?? false
)

/**
 * Initializing state store
 */
export const isInitializing: Writable<boolean> = writable(false)

/**
 * Initialization error store
 */
export const initError: Writable<Error | null> = writable(null)

/**
 * Connected wallet store
 */
export const wallet: Writable<WalletInfo | null> = writable(null)

/**
 * Current network store
 */
export const network: Writable<NetworkInfo | null> = writable(null)

/**
 * Is connected derived store
 */
export const isConnected: Readable<boolean> = derived(
  wallet,
  ($wallet) => $wallet !== null
)

/**
 * Initialize FHEVM client
 * 
 * @param config - FHEVM configuration
 * @returns Promise resolving to initialized client
 * 
 * @throws {Error} If initialization fails
 * 
 * @example
 * ```typescript
 * await initializeFHEVM({ chainId: 31337 })
 * ```
 */
export async function initializeFHEVM(config: FHEVMConfig): Promise<FHEVMClient> {
  isInitializing.set(true)
  initError.set(null)

  try {
    const client = new FHEVMClient()
    await client.initialize(config)
    
    fhevmClient.set(client)
    network.set(client.getNetwork())
    
    return client
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Failed to initialize FHEVM')
    initError.set(err)
    throw err
  } finally {
    isInitializing.set(false)
  }
}

/**
 * Connect wallet
 * 
 * @param provider - Ethereum provider (optional, defaults to window.ethereum)
 * @returns Promise resolving to wallet info
 * 
 * @throws {Error} If connection fails or client not initialized
 * 
 * @example
 * ```typescript
 * await connectWallet(window.ethereum)
 * ```
 */
export async function connectWallet(provider?: any): Promise<WalletInfo> {
  return new Promise<WalletInfo>((resolve, reject) => {
    const unsubscribe = fhevmClient.subscribe(async (client) => {
      if (client === null) {
        reject(new Error('FHEVM client not initialized'))
        return
      }

      try {
        const walletInfo = await client.connectWallet(provider)
        wallet.set(walletInfo)
        resolve(walletInfo)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to connect wallet')
        reject(err)
      } finally {
        unsubscribe()
      }
    })
  })
}

/**
 * Disconnect wallet
 * 
 * @example
 * ```typescript
 * disconnectWallet()
 * ```
 */
export function disconnectWallet(): void {
  wallet.set(null)
}

/**
 * Reset FHEVM client
 * 
 * @returns Promise that resolves when reset is complete
 * 
 * @example
 * ```typescript
 * await resetFHEVM()
 * ```
 */
export async function resetFHEVM(): Promise<void> {
  return new Promise<void>((resolve) => {
    const unsubscribe = fhevmClient.subscribe(async (client) => {
      if (client !== null) {
        await client.reset()
      }

      fhevmClient.set(null)
      wallet.set(null)
      network.set(null)
      initError.set(null)
      
      unsubscribe()
      resolve()
    })
  })
}
