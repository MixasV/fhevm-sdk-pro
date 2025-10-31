/**
 * Main FHEVM Client class
 * 
 * Placeholder for Sprint 1 implementation
 */

import type { FHEVMConfig } from '../types'

/**
 * Core FHEVM client for encryption, decryption, and contract interaction
 * 
 * @example
 * ```typescript
 * const client = new FHEVMClient()
 * await client.initialize({ chainId: 31337 })
 * ```
 */
export class FHEVMClient {
  private config: FHEVMConfig | null = null

  /**
   * Initialize the FHEVM client
   * 
   * @param config - Configuration options
   * @returns Promise that resolves when initialization is complete
   */
  async initialize(config: FHEVMConfig): Promise<void> {
    this.config = config
    // Implementation will be added in Sprint 1
  }

  /**
   * Check if client is initialized
   * 
   * @returns True if client is initialized
   */
  isInitialized(): boolean {
    return this.config !== null
  }
}
