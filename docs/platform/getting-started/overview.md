# Getting Started Overview

This guide will help you get started with the Arribada platform, from setting up your development environment to deploying your first connected device.

## What You'll Learn

By the end of this getting started series, you'll be able to:

- Set up the complete Arribada development environment
- Understand the platform architecture and key components
- Build and deploy your first satellite-connected device
- Integrate with the Arribada cloud platform for data collection

## Prerequisites

### Hardware Requirements
- Development computer (Windows, macOS, or Linux)
- Arribada development kit (recommended: Horizon V4 DevKit)
- USB cable for device programming
- Optional: Antenna testing equipment

### Software Requirements
- Git version control
- Python 3.8+ for toolchain
- VS Code or similar IDE
- Zephyr RTOS development environment

### Knowledge Requirements
- Basic embedded systems knowledge
- Familiarity with C/C++ programming
- Understanding of IoT concepts
- Optional: Satellite communication basics

## Platform Architecture Overview

The Arribada platform consists of four main layers:

### 1. Hardware Layer
- **Horizon SMD Core**: 20x20x2mm satellite connectivity module
- **Development Kits**: Complete reference designs
- **Sensors & Peripherals**: Environmental monitoring components
- **Enclosures**: Ruggedized housings for field deployment

### 2. Firmware Layer
- **Zephyr RTOS**: Real-time operating system
- **Arribada SDK**: Platform-specific libraries and APIs
- **Communication Stack**: Argos, LoRa, and cellular protocols
- **Power Management**: Ultra-low power optimisation

### 3. Connectivity Layer
- **Satellite**: Argos constellation for global coverage
- **LoRaWAN**: Low-power wide-area networking
- **Cellular**: 5G/4G for high-bandwidth applications
- **Edge Processing**: Local data processing capabilities

### 4. Cloud Layer
- **Data Ingestion**: Multi-protocol data collection
- **Processing Pipeline**: Real-time and batch analytics
- **Dashboard**: Web-based monitoring and control
- **APIs**: RESTful interfaces for integration

## Development Workflow

### 1. Platform Comparison & Selection
Understand how Arribada compares to alternatives and select the right components for your use case.

**Time**: 30 minutes  
**Outcome**: Clear understanding of platform benefits and component selection

[Start Platform Comparison →](/docs/platform/getting-started/comparison)

### 2. Environment Setup
Install and configure the complete development toolchain.

**Time**: 2-3 hours  
**Outcome**: Fully configured development environment ready for coding

[Start Environment Setup →](/docs/platform/getting-started/setup)

### 3. First Device Tutorial
Build, program, and deploy your first connected device.

**Time**: 1-2 hours  
**Outcome**: Working device sending data to the cloud platform

[Start First Device Tutorial →](/docs/platform/getting-started/first-device)

### 4. Integration & Customization
Integrate with your specific sensors and customise for your use case.

**Time**: Variable (1-2 weeks for full application)  
**Outcome**: Production-ready conservation monitoring solution

## Common Use Cases

### Wildlife Tracking
Deploy satellite-connected tags for monitoring animal movement and behaviour.

**Key Components**:
- Horizon V4 with Argos connectivity
- GPS positioning system
- Ultra-low power design
- Ruggedized enclosure

**Example Projects**: Operation Pangolin, Sea Turtle Tags

### Marine Monitoring
Monitor marine environments and ecosystems with long-term deployments.

**Key Components**:
- Waterproof sensors
- Saltwater-resistant housing
- Satellite communication
- Solar power systems

**Example Projects**: MARLIN

### Environmental Research
Collect environmental data from remote locations with reliable connectivity.

**Key Components**:
- Multi-sensor integration
- Weather-resistant design
- Long-range communication
- Cloud data platform

**Example Projects**: Thermal Camera Systems, Environmental Sensors

## Development Kits

### Horizon V4 Development Kit
Complete development platform with:
- Horizon V4 core module
- Breakout board with GPIO access
- USB programming interface
- Sample sensors and peripherals
- Comprehensive documentation

**Price**: Contact for educational/research pricing  
**Availability**: Ships within 2-3 weeks

[View Hardware Details →](/docs/hardware/catalog/dev-kits)

### Evaluation Modules
For specific component evaluation:
- Argos SMD standalone module
- Wings-SMD Featherwing adapter
- Sensor evaluation boards
- Antenna testing kits

## Support & Community

### Getting Help
- **Documentation**: Comprehensive guides and API references
- **Community Forum**: Ask questions and share projects
- **Discord Chat**: Real-time community support
- **GitHub Issues**: Report bugs and request features

### Professional Support
- **Technical Consulting**: Custom development assistance
- **Training Programs**: On-site and remote training options
- **Priority Support**: Commercial support agreements
- **Custom Development**: Turnkey solution development

## Next Steps

Ready to get started? Choose your path:

1. **New to Arribada**: Start with [Platform Comparison](/docs/platform/getting-started/comparison)
2. **Ready to Develop**: Jump to [Environment Setup](/docs/platform/getting-started/setup)
3. **Specific Use Case**: Browse [Project Examples](/docs/projects/conservation/operation-pangolin)
4. **Hardware First**: Explore [Hardware Catalog](/docs/hardware/catalog/horizon-v4)

## Quick Links

- [Platform Architecture](/docs/platform/horizon-core/architecture)
- [Hardware Specifications](/docs/hardware/specs/datasheets)
- [API Documentation](/docs/platform/cloud/api-documentation)
- [Community Guidelines](/community)
- [Commercial Licensing](mailto:partnerships@arribada.org)