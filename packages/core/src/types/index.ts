/**
 * Core type definitions for FHEVM SDK
 * 
 * @packageDocumentation
 */

/**
 * Supported encrypted types in FHEVM
 */
export type EncryptedType =
  | 'ebool'
  | 'euint8'
  | 'euint16'
  | 'euint32'
  | 'euint64'
  | 'euint128'
  | 'euint256'

/**
 * Encrypted value representation
 */
export interface EncryptedValue {
  readonly type: EncryptedType
  readonly value: Uint8Array
  readonly handle?: string
  readonly metadata?: Record<string, unknown>
}

/**
 * Placeholder for client configuration
 * Will be implemented in Sprint 1
 */
export interface FHEVMConfig {
  chainId?: number
  rpcUrl?: string
}
