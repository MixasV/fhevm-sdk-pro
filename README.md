# FHEVM SDK Pro

> Enterprise-Grade Universal FHEVM SDK with Zero-Configuration Setup and Production-Ready Tooling

[![CI](https://github.com/your-org/fhevm-sdk-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/fhevm-sdk-pro/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/your-org/fhevm-sdk-pro/branch/main/graph/badge.svg)](https://codecov.io/gh/your-org/fhevm-sdk-pro)
[![npm version](https://badge.fury.io/js/%40fhevm-sdk%2Fcore.svg)](https://www.npmjs.com/package/@mixaspro/core)
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
npx @mixaspro/cli create my-fhevm-app

# Or initialize in existing project
npx @mixaspro/cli init
```

### Manual Installation

```bash
# Core + React
pnpm add @mixaspro/core @mixaspro/react ethers

# Core + Svelte
pnpm add @mixaspro/core @mixaspro/svelte ethers

# Core only
pnpm add @mixaspro/core ethers
```

### React Example

```tsx
import { FHEVMProvider, useFHEVM, useEncrypt, useWriteEncrypted } from '@mixaspro/react'

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
import { useFHEVM, useEncrypt, useWriteEncrypted } from '@mixaspro/vue'

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
| [@mixaspro/core](./packages/core)         | Framework-agnostic core SDK | [![npm](https://img.shields.io/npm/v/@mixaspro/core.svg)](https://www.npmjs.com/package/@mixaspro/core)         |
| [@mixaspro/react](./packages/react)       | React hooks and components  | [![npm](https://img.shields.io/npm/v/@mixaspro/react.svg)](https://www.npmjs.com/package/@mixaspro/react)       |
| [@mixaspro/vue](./packages/vue)           | Vue 3 composables           | [![npm](https://img.shields.io/npm/v/@mixaspro/vue.svg)](https://www.npmjs.com/package/@mixaspro/vue)           |
| [@mixaspro/svelte](./packages/svelte)     | Svelte stores               | [![npm](https://img.shields.io/npm/v/@mixaspro/svelte.svg)](https://www.npmjs.com/package/@mixaspro/svelte)     |
| [@mixaspro/angular](./packages/angular)   | Angular services            | [![npm](https://img.shields.io/npm/v/@mixaspro/angular.svg)](https://www.npmjs.com/package/@mixaspro/angular)   |
| [@mixaspro/solid](./packages/solid)       | Solid.js signals            | [![npm](https://img.shields.io/npm/v/@mixaspro/solid.svg)](https://www.npmjs.com/package/@mixaspro/solid)       |
| [@mixaspro/testing](./packages/testing)   | Testing utilities           | [![npm](https://img.shields.io/npm/v/@mixaspro/testing.svg)](https://www.npmjs.com/package/@mixaspro/testing)   |
| [@mixaspro/cli](./packages/cli)           | CLI scaffolding tool        | [![npm](https://img.shields.io/npm/v/@mixaspro/cli.svg)](https://www.npmjs.com/package/@mixaspro/cli)           |
| [@mixaspro/devtools](./packages/devtools) | Browser DevTools extension  | [![npm](https://img.shields.io/npm/v/@mixaspro/devtools.svg)](https://www.npmjs.com/package/@mixaspro/devtools) |

## Documentation

- [Getting Started](./docs/guides/getting-started.md)
- [API Reference](./docs/api/README.md)
- [Tutorials](./docs/tutorials/README.md)
- [Examples](./examples/README.md)

## CLI Tool

Create a new FHEVM project in seconds:

```bash
npx @mixaspro/cli create my-app
```

Generate type-safe hooks from contract ABIs:

```bash
npx @mixaspro/cli generate-hooks --abi ./contracts/MyContract.json --framework react
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
