---
title: Development Environment Setup
sidebar_position: 2
---

# Development Environment Setup

This guide will help you set up your development environment for contributing to Arribada projects.

## Prerequisites

### Required Tools
- Git (2.30+)
- Docker & Docker Compose
- Node.js (18+ LTS)
- Python (3.9+)
- VS Code or preferred IDE

### Platform-Specific Requirements

#### Firmware Development
- Zephyr RTOS SDK
- Nordic nRF Connect SDK
- J-Link debugger
- Serial terminal (e.g., minicom, screen)

#### Hardware Development
- KiCad 7.0+
- FreeCAD or Fusion 360
- Logic analyser (Saleae recommended)
- Oscilloscope for debugging

#### Cloud/Web Development
- AWS CLI configured
- Terraform 1.5+
- kubectl for Kubernetes
- PostgreSQL client tools

## Repository Structure

```
arribada/
├── firmware/           # Embedded firmware projects
│   ├── horizon-core/   # Core satellite platform
│   ├── drivers/        # Device drivers
│   └── examples/       # Reference implementations
├── hardware/           # PCB designs and mechanical
│   ├── horizon-v4/     # Latest hardware revision
│   ├── enclosures/     # 3D models and drawings
│   └── manufacturing/  # Production files
├── cloud/              # Cloud infrastructure
│   ├── api/            # REST API services
│   ├── dashboard/      # Web dashboard
│   └── infrastructure/ # Terraform configs
├── tools/              # Development tools
│   ├── flasher/        # Firmware flashing tools
│   ├── testing/        # Test harnesses
│   └── analysis/       # Data analysis scripts
└── docs/               # Documentation
```

## Environment Setup

### 1. Clone Repositories

```bash
# Clone the main platform repository
git clone https://github.com/arribada/platform.git
cd platform

# Install git hooks
./scripts/install-hooks.sh
```

### 2. Firmware Development Setup

```bash
# Install Zephyr SDK
cd ~/
wget https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v0.16.3/zephyr-sdk-0.16.3_linux-x86_64.tar.xz
tar xvf zephyr-sdk-0.16.3_linux-x86_64.tar.xz
cd zephyr-sdk-0.16.3
./setup.sh

# Set up Zephyr workspace
west init -m https://github.com/arribada/horizon-firmware --mr main ~/arribada-workspace
cd ~/arribada-workspace
west update
west zephyr-export
pip3 install -r zephyr/scripts/requirements.txt
```

### 3. Cloud Development Setup

```bash
# Install dependencies
cd cloud/dashboard
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### 4. Hardware Development Setup

```bash
# Install KiCad libraries
cd hardware/
./scripts/install-libraries.sh

# Verify installation
kicad --version
```

## IDE Configuration

### VS Code

Install recommended extensions:
```json
{
  "recommendations": [
    "ms-vscode.cpptools",
    "nordic-semiconductor.nrf-connect",
    "ms-python.python",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker"
  ]
}
```

### Zephyr Development

Create `.vscode/settings.json`:
```json
{
  "C_Cpp.default.compilerPath": "${env:ZEPHYR_SDK_INSTALL_DIR}/arm-zephyr-eabi/bin/arm-zephyr-eabi-gcc",
  "C_Cpp.default.configurationProvider": "nordic-semiconductor.nrf-connect",
  "nrf-connect.topdir": "${workspaceFolder}",
  "nrf-connect.toolchain.path": "${env:ZEPHYR_SDK_INSTALL_DIR}",
  "files.associations": {
    "*.conf": "properties",
    "*.overlay": "dts"
  }
}
```

## Verification

Run the verification script to ensure your environment is properly configured:

```bash
./scripts/verify-setup.sh
```

This will check:
- ✓ Git configuration
- ✓ Required tools installation
- ✓ Repository access
- ✓ Build environment
- ✓ Development dependencies

## Troubleshooting

### Common Issues

#### Permission Denied
```bash
# Fix USB device permissions for firmware flashing
sudo usermod -a -G dialout $USER
# Log out and back in for changes to take effect
```

#### Build Failures
```bash
# Clean build environment
west build -t clean
rm -rf build/

# Rebuild with verbose output
west build -b horizon_v4 firmware/horizon-core -- -v
```

#### Missing Dependencies
```bash
# Update all dependencies
west update
pip3 install --upgrade -r requirements.txt
npm update
```

## Next Steps

Once your environment is set up:
1. Review our [Code Standards](./code-standards.md)
2. Understand our [Version Control workflow](./version-control.md)
3. Run the example projects to verify everything works
4. Pick an issue from our [Good First Issues](https://github.com/arribada/platform/labels/good%20first%20issue) list

Need help? Ask in our [Developer Forum](https://forum.arribada.org) or Slack #dev-help channel.
