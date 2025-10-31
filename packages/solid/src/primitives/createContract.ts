/**
 * Solid.js primitives for contract interactions
 * 
 * @packageDocumentation
 */

import { createSignal, createEffect, onCleanup } from 'solid-js'
import { useFHEVM } from '../context'
import type { ContractFunctionParams, TransactionReceipt } from '@fhevm-sdk/core'

/**
 * Create contract write return type
 */
export interface CreateContractWriteReturn {
  data: () => TransactionReceipt | null
  isWriting: () => boolean
  error: () => Error | null
  write: (params?: { args?: unknown[] }) => Promise<TransactionReceipt>
  reset: () => void
}

/**
 * Create contract write primitive
 * 
 * @param params - Contract function parameters
 * @returns Contract write primitive
 * 
 * @example
 * ```tsx
 * import { createContractWrite } from '@fhevm-sdk/solid'
 * 
 * function Transfer() {
 *   const { data, isWriting, write } = createContractWrite({
 *     address: '0x...',
 *     abi: contractABI,
 *     functionName: 'transfer'
 *   })
 * 
 *   async function handleTransfer() {
 *     await write({ args: ['0x...', 100] })
 *   }
 * 
 *   return (
 *     <button onClick={handleTransfer} disabled={isWriting()}>
 *       {isWriting() ? 'Sending...' : 'Transfer'}
 *     </button>
 *   )
 * }
 * ```
 */
export function createContractWrite(params: {
  address: string
  abi: any[]
  functionName: string
}): CreateContractWriteReturn {
  const { client } = useFHEVM()
  
  const [data, setData] = createSignal<TransactionReceipt | null>(null)
  const [isWriting, setIsWriting] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  async function write(execParams?: { args?: unknown[] }): Promise<TransactionReceipt> {
    const fhevmClient = client()
    
    if (!fhevmClient) {
      throw new Error('FHEVM client not initialized')
    }

    setIsWriting(true)
    setError(null)

    try {
      const contractParams: ContractFunctionParams = {
        address: params.address,
        abi: params.abi,
        functionName: params.functionName,
        args: execParams?.args,
      }

      const receipt = await fhevmClient.executeContract(contractParams)
      setData(receipt)
      return receipt
    } catch (err) {
      const writeError = err instanceof Error ? err : new Error('Contract write failed')
      setError(writeError)
      throw writeError
    } finally {
      setIsWriting(false)
    }
  }

  function reset() {
    setData(null)
    setError(null)
    setIsWriting(false)
  }

  return {
    data,
    isWriting,
    error,
    write,
    reset,
  }
}

/**
 * Create contract read params
 */
export interface CreateContractReadParams {
  address: string
  abi: any[]
  functionName: string
  args?: unknown[]
  enabled?: boolean
  pollingInterval?: number
}

/**
 * Create contract read return type
 */
export interface CreateContractReadReturn<T = unknown> {
  data: () => T | null
  isLoading: () => boolean
  error: () => Error | null
  refetch: () => Promise<T>
}

/**
 * Create contract read primitive
 * 
 * @param params - Contract read parameters
 * @returns Contract read primitive
 * 
 * @example
 * ```tsx
 * import { createContractRead } from '@fhevm-sdk/solid'
 * 
 * function Balance() {
 *   const { data, isLoading } = createContractRead({
 *     address: '0x...',
 *     abi: contractABI,
 *     functionName: 'balanceOf',
 *     args: [address],
 *     enabled: true,
 *     pollingInterval: 10000
 *   })
 * 
 *   return (
 *     <Show when={!isLoading()} fallback={<div>Loading...</div>}>
 *       <div>Balance: {data()}</div>
 *     </Show>
 *   )
 * }
 * ```
 */
export function createContractRead<T = unknown>(
  params: CreateContractReadParams
): CreateContractReadReturn<T> {
  const { client } = useFHEVM()
  
  const [data, setData] = createSignal<T | null>(null)
  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)
  
  let intervalId: ReturnType<typeof setInterval> | null = null

  async function refetch(): Promise<T> {
    const fhevmClient = client()
    
    if (!fhevmClient) {
      throw new Error('FHEVM client not initialized')
    }

    setIsLoading(true)
    setError(null)

    try {
      const contractParams: ContractFunctionParams = {
        address: params.address,
        abi: params.abi,
        functionName: params.functionName,
        args: params.args,
      }

      // Note: Using executeContract as placeholder for read operations
      const receipt = await fhevmClient.executeContract(contractParams)
      const result = receipt as unknown as T
      setData(() => result)
      return result
    } catch (err) {
      const readError = err instanceof Error ? err : new Error('Contract read failed')
      setError(readError)
      throw readError
    } finally {
      setIsLoading(false)
    }
  }

  function startPolling() {
    if (intervalId !== null || !params.pollingInterval) {
      return
    }

    intervalId = setInterval(() => {
      refetch().catch(() => {
        // Error already set in refetch
      })
    }, params.pollingInterval)
  }

  function stopPolling() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  // Auto-fetch and polling
  createEffect(() => {
    if (params.enabled !== false) {
      refetch().catch(() => {
        // Error already set in refetch
      })
      startPolling()
    } else {
      stopPolling()
    }
  })

  // Cleanup
  onCleanup(() => {
    stopPolling()
  })

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}
