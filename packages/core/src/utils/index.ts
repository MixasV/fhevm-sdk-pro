/**
 * Utility functions for FHEVM SDK
 * 
 * @packageDocumentation
 */

/**
 * Check if value is a valid encrypted type
 * 
 * @param type - Type to check
 * @returns True if type is valid
 */
export function isValidEncryptedType(type: string): boolean {
  const validTypes = ['ebool', 'euint8', 'euint16', 'euint32', 'euint64', 'euint128', 'euint256']
  return validTypes.includes(type)
}
