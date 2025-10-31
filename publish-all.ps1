# Publish all FHEVM SDK packages to npm
Write-Host '=====================================' -ForegroundColor Cyan
Write-Host 'FHEVM SDK Pro v1.0.0 - NPM Publication' -ForegroundColor Cyan
Write-Host 'Scope: @mixaspro' -ForegroundColor Yellow
Write-Host '=====================================' -ForegroundColor Cyan
Write-Host ''

# Check if logged in
Write-Host 'Checking npm authentication...' -ForegroundColor Yellow
$whoami = npm whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'ERROR: Not logged in to npm!' -ForegroundColor Red
    Write-Host 'Please run: npm login' -ForegroundColor Yellow
    exit 1
}
Write-Host "Logged in as: $whoami" -ForegroundColor Green
Write-Host ''

# Build packages
Write-Host 'Building packages...' -ForegroundColor Yellow
pnpm --filter='!fhevm-*-example' build
if ($LASTEXITCODE -ne 0) {
    Write-Host 'ERROR: Build failed!' -ForegroundColor Red
    exit 1
}
Write-Host 'Build successful!' -ForegroundColor Green
Write-Host ''

# Define packages
$packages = @(
    @{Name='@mixaspro/core'; Path='packages/core'},
    @{Name='@mixaspro/testing'; Path='packages/testing'},
    @{Name='@mixaspro/devtools'; Path='packages/devtools'},
    @{Name='@mixaspro/react'; Path='packages/react'},
    @{Name='@mixaspro/vue'; Path='packages/vue'},
    @{Name='@mixaspro/svelte'; Path='packages/svelte'},
    @{Name='@mixaspro/angular'; Path='packages/angular'},
    @{Name='@mixaspro/solid'; Path='packages/solid'},
    @{Name='@mixaspro/cli'; Path='packages/cli'}
)

$published = @()
$failed = @()

# Publish each package
foreach ($pkg in $packages) {
    Write-Host '=====================================' -ForegroundColor Cyan
    Write-Host "Publishing: $($pkg.Name)@1.0.0" -ForegroundColor Yellow
    Write-Host '=====================================' -ForegroundColor Cyan
    
    Push-Location $pkg.Path
    
    # Check if already published
    $checkVersion = npm view "$($pkg.Name)@1.0.0" version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "WARNING: $($pkg.Name)@1.0.0 already published, skipping..." -ForegroundColor Yellow
        Pop-Location
        $published += $pkg.Name
        continue
    }
    
    # Publish
    npm publish --access public --no-git-checks
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: $($pkg.Name)@1.0.0 published!" -ForegroundColor Green
        $published += $pkg.Name
    } else {
        Write-Host "ERROR: Failed to publish $($pkg.Name)" -ForegroundColor Red
        $failed += $pkg.Name
    }
    
    Pop-Location
    Write-Host ''
}

# Summary
Write-Host ''
Write-Host '=====================================' -ForegroundColor Cyan
Write-Host 'Publication Summary' -ForegroundColor Cyan
Write-Host '=====================================' -ForegroundColor Cyan
Write-Host "Published: $($published.Count)/9 packages" -ForegroundColor Green
foreach ($p in $published) {
    Write-Host "  OK $p" -ForegroundColor Green
}

if ($failed.Count -gt 0) {
    Write-Host ''
    Write-Host "Failed: $($failed.Count) packages" -ForegroundColor Red
    foreach ($f in $failed) {
        Write-Host "  X $f" -ForegroundColor Red
    }
    exit 1
}

Write-Host ''
Write-Host 'All packages published successfully!' -ForegroundColor Green
