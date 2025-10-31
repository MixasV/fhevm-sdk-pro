/**
 * FHEVM React Context
 * 
 * @packageDocumentation
 */

import { createContext } from 'react'

import type { FHEVMClient, FHEVMConfig, WalletInfo, NetworkInfo } from '@fhevm-sdk/core'

/**
 * FHEVM Context value interface
 */
export interface FHEVMContextValue {
  /**
   * FHEVM client instance
   */
  client: FHEVMClient | null

  /**
   * Initialization state
   */
  isInitialized: boolean

  /**
   * Loading state during initialization
   */
  isInitializing: boolean

  /**
   * Error during initialization
   */
  initError: Error | null

  /**
   * Connected wallet information
   */
  wallet: WalletInfo | null

  /**
   * Current network information
   */
  network: NetworkInfo | null

  /**
   * Connect wallet function
   */
  connectWallet: (provider?: any) => Promise<WalletInfo>

  /**
   * Disconnect wallet function
   */
  disconnectWallet: () => void

  /**
   * Reinitialize FHEVM client
   */
  reinitialize: (config?: Partial<FHEVMConfig>) => Promise<void>
}

/**
 * FHEVM React Context
 * 
 * Provides FHEVM client and state to all child components
 */
export const FHEVMContext = createContext<FHEVMContextValue | null>(null)

FHEVMContext.displayName = 'FHEVMContext'
