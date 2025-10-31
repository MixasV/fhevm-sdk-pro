const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('📦 Building examples...')

// Build examples
try {
  execSync('pnpm --filter fhevm-react-counter-example build', { stdio: 'inherit' })
  execSync('pnpm --filter fhevm-svelte-voting-example build', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ Failed to build examples:', error.message)
  process.exit(1)
}

const publicDir = path.join(__dirname, '..', 'public')
const reactDist = path.join(__dirname, '..', 'examples', 'react-counter', 'dist')
const svelteDist = path.join(__dirname, '..', 'examples', 'svelte-voting', 'dist')

// Create public directory
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// Copy react-counter
const reactTarget = path.join(publicDir, 'react-counter')
if (fs.existsSync(reactDist)) {
  fs.cpSync(reactDist, reactTarget, { recursive: true })
  console.log('✓ Copied react-counter to public/')
}

// Copy svelte-voting
const svelteTarget = path.join(publicDir, 'svelte-voting')
if (fs.existsSync(svelteDist)) {
  fs.cpSync(svelteDist, svelteTarget, { recursive: true })
  console.log('✓ Copied svelte-voting to public/')
}

// Create index.html with links
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FHEVM SDK Pro - Examples</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 { color: #333; }
    .example {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .example h2 { margin-top: 0; }
    .example a {
      display: inline-block;
      padding: 10px 20px;
      background: #0070f3;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 10px;
    }
    .example a:hover { background: #0051cc; }
  </style>
</head>
<body>
  <h1>🔐 FHEVM SDK Pro - Live Examples</h1>
  <p>Enterprise-Grade Universal FHEVM SDK with Production-Ready Tooling</p>
  
  <div class="example">
    <h2>⚛️ React Counter Example</h2>
    <p>Encrypted counter using React hooks and FHEVM SDK</p>
    <a href="/react-counter/">View Demo →</a>
  </div>
  
  <div class="example">
    <h2>🎯 Svelte Voting Example</h2>
    <p>Private voting application built with Svelte stores</p>
    <a href="/svelte-voting/">View Demo →</a>
  </div>

  <hr style="margin: 40px 0;">
  
  <p>
    <strong>Links:</strong><br>
    📦 <a href="https://www.npmjs.com/search?q=%40mixaspro">NPM Packages</a><br>
    💻 <a href="https://github.com/MixasV/fhevm-sdk-pro">GitHub Repository</a><br>
    📚 <a href="https://github.com/MixasV/fhevm-sdk-pro#readme">Documentation</a>
  </p>
</body>
</html>
`

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml)
console.log('✓ Created index.html')

console.log('\n✅ Vercel deployment prepared successfully!')
