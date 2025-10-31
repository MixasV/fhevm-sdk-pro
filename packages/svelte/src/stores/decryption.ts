/**
 * Decryption Svelte stores
 * 
 * @packageDocumentation
 */

import { writable, type Writable } from 'svelte/store'

import { fhevmClient } from './fhevm'

/**
 * Decryption loading state
 */
export const isDecrypting: Writable<boolean> = writable(false)

/**
 * Last decryption error
 */
export const decryptionError: Writable<Error | null> = writable(null)

/**
 * Last decrypted value
 */
export const decryptedData: Writable<unknown | null> = writable(null)

/**
 * Decrypt a ciphertext
 * 
 * @param ciphertext - Ciphertext to decrypt
 * @param timeout - Timeout in milliseconds (default: 30000)
 * @returns Promise resolving to decrypted value
 * 
 * @throws {Error} If decryption fails or client not initialized
 * 
 * @example
 * ```typescript
 * const value = await decrypt(ciphertext, 30000)
 * console.log('Decrypted:', value)
 * ```
 */
export async function decrypt(
  ciphertext: Uint8Array,
  timeout = 30000
): Promise<unknown> {
  let client: any = null
  
  fhevmClient.subscribe((c) => {
    client = c
  })()

  if (client === null || !client.isInitialized()) {
    throw new Error('FHEVM client not initialized')
  }

  isDecrypting.set(true)
  decryptionError.set(null)

  try {
    // Request decryption
    const request = await client.requestDecryption(ciphertext)
    
    // Wait for result
    const result = await client.waitForDecryption(request.id, timeout)
    
    decryptedData.set(result.value)
    return result.value
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Decryption failed')
    decryptionError.set(err)
    throw err
  } finally {
    isDecrypting.set(false)
  }
}

/**
 * Reset decryption state
 * 
 * @example
 * ```typescript
 * resetDecryption()
 * ```
 */
export function resetDecryption(): void {
  decryptionError.set(null)
  decryptedData.set(null)
  isDecrypting.set(false)
}
