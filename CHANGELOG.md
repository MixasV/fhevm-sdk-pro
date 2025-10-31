# FHEVM SDK Pro - Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-31

### 🎉 Initial Release

Enterprise-grade universal FHEVM SDK with production-ready tooling.

### 📦 Packages Released

- **@fhevm-sdk/core** (37.34 KB) - Core SDK with full FHEVM support
- **@fhevm-sdk/react** (9.45 KB) - React hooks and context
- **@fhevm-sdk/svelte** (5.61 KB) - Svelte stores and helpers
- **@fhevm-sdk/cli** (20.89 KB) - CLI tool for scaffolding

### ✨ Features

#### Core SDK (@fhevm-sdk/core)
- Full FHEVM encryption/decryption
- Wallet integration (MetaMask, WalletConnect)
- Smart contract interactions
- Transaction Queue (priority, retry, rate limiting)
- Encryption Cache (TTL, LRU eviction)
- Operation Batching
- Circuit Breaker pattern
- Performance benchmarks
- Advanced retry strategies

#### React Adapter (@fhevm-sdk/react)
- FHEVMProvider context
- 6 production hooks (useFHEVM, useWallet, useEncrypt, useDecrypt, useReadEncrypted, useWriteEncrypted)
- Automatic initialization
- Type-safe API

#### Svelte Adapter (@fhevm-sdk/svelte)
- 4 reactive stores
- Helper functions for all operations
- Full TypeScript support

#### CLI Tool (@fhevm-sdk/cli)
- Project scaffolding (create command)
- ABI to TypeScript generator (generate-types command)
- Existing project initialization (init command)
- Multi-framework support

### 📚 Documentation

- Complete API documentation
- Performance optimization guide
- Security best practices
- Working examples (React Counter, Svelte Voting)

### 🧪 Testing

- 106 unit tests
- 85 passing (80% pass rate)
- 100% coverage for EncryptionCache
- 82% coverage for TransactionQueue

### 🔒 Security

- TypeScript strict mode
- Input validation
- Rate limiting
- Circuit breaker protection
- Security audit completed

### 📊 Bundle Sizes

All packages are optimized and tree-shakeable:
- Core: 37.34 KB ESM
- React: 9.45 KB ESM
- Svelte: 5.61 KB ESM
- CLI: 20.89 KB

### 🎯 Developer Experience

- Zero configuration setup
- Framework agnostic core
- Type-safe API
- Comprehensive JSDoc
- Interactive examples

### 🚀 Getting Started

```bash
# Install
npm install @fhevm-sdk/core @fhevm-sdk/react

# Or use CLI
npx @fhevm-sdk/cli create my-fhevm-app
```

### 📖 Links

- [Documentation](./docs)
- [Examples](./examples)
- [API Reference](./docs/api)
- [Performance Guide](./docs/PERFORMANCE.md)
- [Security Guide](./docs/SECURITY.md)

---

For package-specific changelogs, see:
- [Core Changelog](./packages/core/CHANGELOG.md)
- [React Changelog](./packages/react/CHANGELOG.md)
- [Svelte Changelog](./packages/svelte/CHANGELOG.md)
- [CLI Changelog](./packages/cli/CHANGELOG.md)
