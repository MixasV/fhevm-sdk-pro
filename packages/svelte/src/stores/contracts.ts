/**
 * Contract interaction Svelte stores
 * 
 * @packageDocumentation
 */

import { writable, type Writable } from 'svelte/store'

import type { ContractFunctionParams, TransactionReceipt } from '@fhevm-sdk/core'

import { fhevmClient } from './fhevm'

/**
 * Contract read loading state
 */
export const isReading: Writable<boolean> = writable(false)

/**
 * Contract write loading state
 */
export const isWriting: Writable<boolean> = writable(false)

/**
 * Last contract error
 */
export const contractError: Writable<Error | null> = writable(null)

/**
 * Last contract read result
 */
export const readData: Writable<unknown | null> = writable(null)

/**
 * Last transaction receipt
 */
export const transactionReceipt: Writable<TransactionReceipt | null> = writable(null)

/**
 * Read from contract
 * 
 * @param params - Contract function parameters
 * @returns Promise resolving to read result
 * 
 * @throws {Error} If read fails or client not initialized
 * 
 * @example
 * ```typescript
 * const result = await readContract({
 *   address: '0x...',
 *   abi: contractABI,
 *   functionName: 'balanceOf',
 *   args: [userAddress],
 * })
 * ```
 */
export async function readContract(params: ContractFunctionParams): Promise<unknown> {
  let client: any = null
  
  fhevmClient.subscribe((c) => {
    client = c
  })()

  if (client === null || !client.isInitialized()) {
    throw new Error('FHEVM client not initialized')
  }

  isReading.set(true)
  contractError.set(null)

  try {
    const result = await client.executeContract(params)
    
    // Extract result from receipt (placeholder - needs proper implementation)
    const value = result.hash
    
    readData.set(value)
    return value
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Contract read failed')
    contractError.set(err)
    throw err
  } finally {
    isReading.set(false)
  }
}

/**
 * Write to contract
 * 
 * @param params - Contract function parameters
 * @returns Promise resolving to transaction receipt
 * 
 * @throws {Error} If write fails or client not initialized
 * 
 * @example
 * ```typescript
 * const receipt = await writeContract({
 *   address: '0x...',
 *   abi: contractABI,
 *   functionName: 'transfer',
 *   args: [recipient, encryptedAmount],
 *   gasLimit: 200000n,
 * })
 * ```
 */
export async function writeContract(
  params: ContractFunctionParams
): Promise<TransactionReceipt> {
  let client: any = null
  
  fhevmClient.subscribe((c) => {
    client = c
  })()

  if (client === null || !client.isInitialized()) {
    throw new Error('FHEVM client not initialized')
  }

  isWriting.set(true)
  contractError.set(null)

  try {
    const receipt = await client.executeContract(params)
    transactionReceipt.set(receipt)
    return receipt
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Contract write failed')
    contractError.set(err)
    throw err
  } finally {
    isWriting.set(false)
  }
}

/**
 * Reset contract state
 * 
 * @example
 * ```typescript
 * resetContracts()
 * ```
 */
export function resetContracts(): void {
  contractError.set(null)
  readData.set(null)
  transactionReceipt.set(null)
  isReading.set(false)
  isWriting.set(false)
}
