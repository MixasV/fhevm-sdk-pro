/**
 * Vue composable for FHEVM context
 * 
 * @packageDocumentation
 */

import { inject, type InjectionKey } from 'vue'
import type { FHEVMClient, NetworkInfo, WalletInfo } from '@fhevm-sdk/core'

/**
 * FHEVM context interface
 */
export interface FHEVMContext {
  /**
   * FHEVM client instance
   */
  client: FHEVMClient | null

  /**
   * Whether FHEVM is initialized
   */
  isInitialized: boolean

  /**
   * Current network information
   */
  network: NetworkInfo | null

  /**
   * Connected wallet information
   */
  wallet: WalletInfo | null

  /**
   * Initialization error if any
   */
  error: Error | null
}

/**
 * Injection key for FHEVM context
 */
export const FHEVMContextKey: InjectionKey<FHEVMContext> = Symbol('fhevm-context')

/**
 * Use FHEVM context
 * 
 * @returns FHEVM context
 * 
 * @throws {Error} If used outside FHEVMProvider
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useFHEVM } from '@fhevm-sdk/vue'
 * 
 * const { client, isInitialized, wallet } = useFHEVM()
 * </script>
 * ```
 */
export function useFHEVM(): FHEVMContext {
  const context = inject(FHEVMContextKey)
  
  if (!context) {
    throw new Error('useFHEVM must be used within FHEVMProvider')
  }
  
  return context
}
