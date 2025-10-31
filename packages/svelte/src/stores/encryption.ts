/**
 * Encryption Svelte stores
 * 
 * @packageDocumentation
 */

import { writable, type Writable } from 'svelte/store'

import type { EncryptedType, EncryptedValue, EncryptionOptions } from '@fhevm-sdk/core'

import { fhevmClient } from './fhevm'

/**
 * Encryption loading state
 */
export const isEncrypting: Writable<boolean> = writable(false)

/**
 * Last encryption error
 */
export const encryptionError: Writable<Error | null> = writable(null)

/**
 * Last encrypted value
 */
export const encryptedData: Writable<EncryptedValue | null> = writable(null)

/**
 * Encrypt a value
 * 
 * @param value - Value to encrypt
 * @param type - Encrypted type
 * @param options - Encryption options
 * @returns Promise resolving to encrypted value
 * 
 * @throws {Error} If encryption fails or client not initialized
 * 
 * @example
 * ```typescript
 * const encrypted = await encrypt(42, 'euint32')
 * console.log(encrypted.handle)
 * ```
 */
export async function encrypt(
  value: number | bigint | boolean,
  type: EncryptedType,
  options?: EncryptionOptions
): Promise<EncryptedValue> {
  let client: any = null
  
  fhevmClient.subscribe((c) => {
    client = c
  })()

  if (client === null || !client.isInitialized()) {
    throw new Error('FHEVM client not initialized')
  }

  isEncrypting.set(true)
  encryptionError.set(null)

  try {
    const encrypted = await client.encrypt(value, type, options)
    encryptedData.set(encrypted)
    return encrypted
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Encryption failed')
    encryptionError.set(err)
    throw err
  } finally {
    isEncrypting.set(false)
  }
}

/**
 * Reset encryption state
 * 
 * @example
 * ```typescript
 * resetEncryption()
 * ```
 */
export function resetEncryption(): void {
  encryptionError.set(null)
  encryptedData.set(null)
  isEncrypting.set(false)
}
