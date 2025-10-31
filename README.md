# FHEVM SDK Pro

> Enterprise-Grade Universal FHEVM SDK with Zero-Configuration Setup and Production-Ready Tooling

[![CI](https://github.com/your-org/fhevm-sdk-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/fhevm-sdk-pro/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/your-org/fhevm-sdk-pro/branch/main/graph/badge.svg)](https://codecov.io/gh/your-org/fhevm-sdk-pro)
[![npm version](https://badge.fury.io/js/%40fhevm-sdk%2Fcore.svg)](https://www.npmjs.com/package/@fhevm-sdk/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Framework Agnostic** - Works with React, Vue, Svelte, Angular, Solid.js, and more
- 🔒 **Type-Safe** - Full TypeScript support with strict mode
- ⚡ **Zero Configuration** - Start building in seconds
- 🧪 **Testing Utilities** - Comprehensive mocking and testing tools
- 🛠️ **CLI Tool** - Scaffold projects and generate type-safe code from ABIs
- 🔍 **DevTools Extension** - Debug encrypted operations in the browser
- 📦 **Tree-Shakeable** - Core package <30KB gzipped
- ✅ **Production Ready** - >95% test coverage, battle-tested patterns

## Quick Start

### Using CLI (Recommended)

```bash
# Create new project
npx @fhevm-sdk/cli create my-fhevm-app

# Or initialize in existing project
npx @fhevm-sdk/cli init
```

### Manual Installation

```bash
# Core + React
pnpm add @fhevm-sdk/core @fhevm-sdk/react ethers

# Core + Svelte
pnpm add @fhevm-sdk/core @fhevm-sdk/svelte ethers

# Core only
pnpm add @fhevm-sdk/core ethers
```

### React Example

```tsx
import { FHEVMProvider, useFHEVM, useEncrypt, useWriteEncrypted } from '@fhevm-sdk/react'

function App() {
  return (
    <FHEVMProvider config={{ chainId: 31337 }}>
      <Counter />
    </FHEVMProvider>
  )
}

function Counter() {
  const { isInitialized, wallet } = useFHEVM()
  const { encrypt, isEncrypting } = useEncrypt()
  const { write, isWriting } = useWriteEncrypted({
    address: '0x...',
    abi: counterABI,
    functionName: 'increment',
  })

  const handleIncrement = async (value: number) => {
    const encrypted = await encrypt(value, 'euint32')
    await write({ args: [encrypted.value] })
  }

  if (!isInitialized) {
    return <div>Initializing FHEVM...</div>
  }

  return (
    <button onClick={() => handleSetValue(42)} disabled={isEncrypting || isPending}>
      Set Value to 42
    </button>
  )
}
```

### Vue Example

```vue
<script setup lang="ts">
import { useFHEVM, useEncrypt, useWriteEncrypted } from '@fhevm-sdk/vue'

const { isInitialized } = useFHEVM()
const { encrypt, isEncrypting } = useEncrypt()
const { write, isPending } = useWriteEncrypted({
  address: '0x...',
  abi: counterABI,
  functionName: 'setEncrypted',
})

const handleSetValue = async (value: number) => {
  const encrypted = await encrypt(value, 'euint32')
  await write({ args: [encrypted] })
}
</script>

<template>
  <div v-if="!isInitialized">Initializing FHEVM...</div>
  <button v-else @click="handleSetValue(42)" :disabled="isEncrypting || isPending">
    Set Value to 42
  </button>
</template>
```

## Packages

| Package                                    | Description                 | Version                                                                                                           |
| ------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [@fhevm-sdk/core](./packages/core)         | Framework-agnostic core SDK | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/core.svg)](https://www.npmjs.com/package/@fhevm-sdk/core)         |
| [@fhevm-sdk/react](./packages/react)       | React hooks and components  | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/react.svg)](https://www.npmjs.com/package/@fhevm-sdk/react)       |
| [@fhevm-sdk/vue](./packages/vue)           | Vue 3 composables           | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/vue.svg)](https://www.npmjs.com/package/@fhevm-sdk/vue)           |
| [@fhevm-sdk/svelte](./packages/svelte)     | Svelte stores               | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/svelte.svg)](https://www.npmjs.com/package/@fhevm-sdk/svelte)     |
| [@fhevm-sdk/angular](./packages/angular)   | Angular services            | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/angular.svg)](https://www.npmjs.com/package/@fhevm-sdk/angular)   |
| [@fhevm-sdk/solid](./packages/solid)       | Solid.js signals            | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/solid.svg)](https://www.npmjs.com/package/@fhevm-sdk/solid)       |
| [@fhevm-sdk/testing](./packages/testing)   | Testing utilities           | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/testing.svg)](https://www.npmjs.com/package/@fhevm-sdk/testing)   |
| [@fhevm-sdk/cli](./packages/cli)           | CLI scaffolding tool        | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/cli.svg)](https://www.npmjs.com/package/@fhevm-sdk/cli)           |
| [@fhevm-sdk/devtools](./packages/devtools) | Browser DevTools extension  | [![npm](https://img.shields.io/npm/v/@fhevm-sdk/devtools.svg)](https://www.npmjs.com/package/@fhevm-sdk/devtools) |

## Documentation

- [Getting Started](./docs/guides/getting-started.md)
- [API Reference](./docs/api/README.md)
- [Tutorials](./docs/tutorials/README.md)
- [Examples](./examples/README.md)

## CLI Tool

Create a new FHEVM project in seconds:

```bash
npx @fhevm-sdk/cli create my-app
```

Generate type-safe hooks from contract ABIs:

```bash
npx @fhevm-sdk/cli generate-hooks --abi ./contracts/MyContract.json --framework react
```

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/fhevm-sdk-pro.git
cd fhevm-sdk-pro

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

### Project Structure

```
fhevm-sdk-pro/
├── packages/          # All SDK packages
│   ├── core/         # Framework-agnostic core
│   ├── react/        # React adapter
│   ├── vue/          # Vue adapter
│   └── ...
├── examples/         # Example applications
├── docs/            # Documentation
└── test/            # Integration and E2E tests
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT © [FHEVM SDK Contributors](./LICENSE.md)

## Acknowledgments

Built with ❤️ using:

- [fhevmjs](https://github.com/zama-ai/fhevmjs) - FHEVM JavaScript library
- [ethers.js](https://github.com/ethers-io/ethers.js/) - Ethereum library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
