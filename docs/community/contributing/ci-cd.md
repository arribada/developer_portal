---
title: CI/CD Pipeline
sidebar_position: 7
---

# CI/CD Pipeline

Our continuous integration and deployment pipeline ensures code quality, automates testing, and streamlines releases. This guide covers our CI/CD setup, workflows, and best practices.

## Overview

### Automation Philosophy
We believe in automating everything that can be automated:
- **Tests run automatically** on every commit
- **Merges happen automatically** when all checks pass
- **Releases are triggered automatically** by Git tags
- **Documentation updates automatically** with code changes
- **Dependencies update automatically** with security patches

This allows small teams and individual contributors to maintain high quality without manual overhead.

### Pipeline Architecture
```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C{Branch Type}
    C -->|Feature| D[Build & Test]
    C -->|Develop| E[Full Test Suite]
    C -->|Release| F[Deploy Staging]
    C -->|Main| G[Deploy Production]
    
    D --> H[PR Checks]
    E --> I[Nightly Builds]
    F --> J[Integration Tests]
    G --> K[Release Assets]
```

## GitHub Actions Workflows

### Pull Request Checks

Create `.github/workflows/pr-checks.yml`:

```yaml
name: PR Checks

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Linters
        run: |
          make lint-firmware
          make lint-python
          make lint-javascript
          
      - name: Check Format
        run: make format-check

  build-firmware:
    strategy:
      matrix:
        board: [horizon_v4, pangolin_tracker, sea_turtle_tag]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive
          
      - name: Cache Zephyr
        uses: actions/cache@v3
        with:
          path: |
            ~/zephyr-sdk
            ~/.west
          key: zephyr-cache-v1
          
      - name: Build Firmware
        run: |
          west build -b $BOARD firmware/main
        env:
          BOARD: ${{ matrix.board }}
          
      - name: Upload Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: firmware-${{ matrix.board }}
          path: build/zephyr/zephyr.hex
```

### Hardware-in-the-Loop Testing

Create `.github/workflows/hardware-tests.yml`:

```yaml
name: Hardware Tests

on:
  workflow_run:
    workflows: ["PR Checks"]
    types:
      - completed

jobs:
  test-firmware:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: [self-hosted, hardware-lab]
    strategy:
      matrix:
        board: [horizon_v4, pangolin_tracker]
    steps:
      - uses: actions/checkout@v3
      
      - name: Download Firmware
        uses: actions/download-artifact@v3
        with:
          name: firmware-${{ matrix.board }}
          
      - name: Flash Device
        run: |
          west flash --board $BOARD --runner jlink
        env:
          BOARD: ${{ matrix.board }}
          
      - name: Run HIL Tests
        run: |
          pytest tests/hardware/$BOARD -v
        env:
          BOARD: ${{ matrix.board }}
          
      - name: Power Profiling
        run: |
          python scripts/power_profile.py --board $BOARD
        env:
          BOARD: ${{ matrix.board }}
          
      - name: Upload Test Results
        uses: actions/upload-artifact@v3
        with:
          name: test-results-${{ matrix.board }}
          path: |
            test-results.xml
            power-profile.csv
```

### Cloud Service Testing

Create `.github/workflows/cloud-tests.yml`:

```yaml
name: Cloud Tests

on: [push, pull_request]

jobs:
  test-cloud:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: testpass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install Dependencies
        run: |
          cd cloud/dashboard
          npm ci
          
      - name: Run Tests
        env:
          DATABASE_URL: postgresql://postgres:testpass@localhost/test
        run: |
          cd cloud/dashboard
          npm run test:ci
          
      - name: E2E Tests
        run: |
          npm run test:e2e

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Trivy
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          
      - name: SAST Scan
        uses: github/super-linter@v4
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Nightly Builds

Create `.github/workflows/nightly.yml`:

```yaml
name: Nightly Build

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC daily
  workflow_dispatch:

jobs:
  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: develop
          
      - name: Setup Test Environment
        run: |
          docker-compose up -d
          ./scripts/wait-for-services.sh
          
      - name: Run Integration Suite
        run: |
          make test-integration
          
      - name: Performance Tests
        run: |
          make test-performance
          
      - name: Generate Report
        run: |
          ./scripts/generate-test-report.sh
          
      - name: Notify Slack
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Nightly build failed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}

  firmware-regression:
    runs-on: [self-hosted, hardware-lab]
    steps:
      - name: Run Regression Suite
        run: |
          python scripts/regression_test.py --suite full
          
      - name: Long-term Stability
        run: |
          python scripts/stability_test.py --duration 24h
```

### Release Pipeline

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  create-release:
    runs-on: ubuntu-latest
    outputs:
      upload_url: ${{ steps.create_release.outputs.upload_url }}
    steps:
      - uses: actions/checkout@v3
      
      - name: Generate Changelog
        run: |
          ./scripts/generate-changelog.sh > CHANGELOG.md
          
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body_path: CHANGELOG.md
          draft: false
          prerelease: false

  build-release-artifacts:
    needs: create-release
    strategy:
      matrix:
        include:
          - board: horizon_v4
            config: release
          - board: pangolin_tracker
            config: release_minimal
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Firmware
        run: |
          west build -b ${{ matrix.board }} -- -DCONFIG_PROFILE=${{ matrix.config }}
          
      - name: Package Firmware
        run: |
          ./scripts/package-firmware.sh ${{ matrix.board }} ${{ github.ref_name }}
          
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ needs.create-release.outputs.upload_url }}
          asset_path: ./firmware-${{ matrix.board }}-${{ github.ref_name }}.zip
          asset_name: firmware-${{ matrix.board }}-${{ github.ref_name }}.zip
          asset_content_type: application/zip

  deploy-documentation:
    needs: create-release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docs
        run: |
          cd docs
          npm install
          npm run build
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/build
```

## Self-Hosted Runners

### Hardware Test Lab Setup

Install and configure a self-hosted runner:

```bash
# Install runner on test machine
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.309.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.309.0/actions-runner-linux-x64-2.309.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.309.0.tar.gz

# Configure runner
./config.sh --url https://github.com/arribada/platform \
  --token $RUNNER_TOKEN \
  --labels hardware-lab,self-hosted

# Install as service
sudo ./svc.sh install
sudo ./svc.sh start
```

### Runner Requirements
- Ubuntu 20.04 or newer
- Zephyr SDK installed
- J-Link tools
- Python 3.9+
- Docker
- Hardware test fixtures connected

## Quality Gates

### Coverage Requirements

Create `.github/codecov.yml`:

```yaml
coverage:
  precision: 2
  round: down
  range: "70...100"

  status:
    project:
      default:
        target: 80%
        threshold: 5%
    patch:
      default:
        target: 90%

comment:
  layout: "reach, diff, flags, files"
  behavior: default
```

### Performance Benchmarks

Create `scripts/performance_gates.py`:

```python
#!/usr/bin/env python3
"""Performance gate checks for CI/CD pipeline."""

PERFORMANCE_THRESHOLDS = {
    'boot_time_ms': 500,
    'gps_acquisition_s': 30,
    'satellite_connect_s': 180,
    'idle_current_ua': 50,
    'active_current_ma': 150,
    'flash_write_kb_s': 100,
}

def check_performance(results):
    """Check if performance metrics meet thresholds."""
    failures = []
    for metric, threshold in PERFORMANCE_THRESHOLDS.items():
        if metric in results and results[metric] > threshold:
            failures.append(
                f"{metric}: {results[metric]} > {threshold}"
            )
    
    if failures:
        raise PerformanceError(
            f"Performance gates failed:\n" + "\n".join(failures)
        )
    
    print("All performance gates passed!")
```

## Deployment Strategies

### Firmware OTA Updates

```mermaid
graph TD
    A[New Firmware] --> B{Validation}
    B -->|Pass| C[Stage to CDN]
    C --> D[Canary Deployment]
    D --> E{Monitor Metrics}
    E -->|Success| F[Progressive Rollout]
    E -->|Issues| G[Rollback]
    F --> H[Full Deployment]
```

### Cloud Deployments

Deploy using Kubernetes:

```bash
# Deploy to staging
kubectl apply -f k8s/staging/ --namespace=arribada-staging

# Run smoke tests
./scripts/smoke-test.sh staging

# Deploy to production with canary
kubectl apply -f k8s/canary/ --namespace=arribada-prod
kubectl set image deployment/api api=arribada/api:$VERSION \
  --namespace=arribada-prod

# Monitor and gradually increase traffic
./scripts/canary-rollout.sh --percentage 10,25,50,100
```

## Monitoring & Alerts

### Build Status Dashboard
- GitHub Actions status badges
- Grafana dashboard for metrics
- Slack notifications for failures

### Metrics Tracked
- Build success rate
- Test execution time
- Code coverage trends
- Deployment frequency
- Mean time to recovery (MTTR)

## Best Practices

### Speed Optimisations
1. **Parallelise tests** - Run independent test suites concurrently
2. **Cache dependencies** - Zephyr SDK, npm packages, Docker layers
3. **Incremental builds** - Only rebuild changed components
4. **Test prioritisation** - Run fast tests first, fail fast

### Reliability
1. **Retry flaky tests** - But track and fix them
2. **Timeout all jobs** - Prevent hanging builds
3. **Clean environments** - Fresh state for each run
4. **Version everything** - Tools, dependencies, configs

### Security
1. **Secret scanning** - Prevent credential leaks
2. **SAST/DAST** - Static and dynamic analysis
3. **Dependency scanning** - Check for vulnerabilities
4. **Sign artifacts** - Ensure authenticity

## Troubleshooting

### Common Issues

**Build Timeout**
```yaml
# Increase timeout for long-running jobs
jobs:
  integration-test:
    timeout-minutes: 60  # Default is 360
```

**Cache Misses**
```yaml
# Debug cache keys
- name: Debug Cache
  run: |
    echo "Cache key: zephyr-${{ hashFiles('west.yml') }}"
    ls -la ~/.west || echo "West not found"
```

**Hardware Test Failures**
```bash
# Reset test hardware
./scripts/reset-hardware.sh --board horizon_v4
# Check connections
./scripts/verify-connections.sh
```

## Next Steps

- Review [Testing Guidelines](./testing.md)
- Understand [Version Control](./version-control.md)
- Learn about [Documentation](./documentation.md)
- Set up your first pipeline!
