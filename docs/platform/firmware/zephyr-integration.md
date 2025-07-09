# Zephyr RTOS Integration

## Overview

Arribada's firmware development is built on Zephyr RTOS, an open-source real-time operating system designed for resource-constrained devices. This document provides guidance based on actual development experiences and project implementations documented in Arribada's conservation technology projects.

## Why Zephyr RTOS?

### Strategic Benefits for Conservation Technology
- **Portability**: Easy migration between different microcontroller platforms
- **Power Efficiency**: Advanced power management for battery-powered field devices
- **Real-Time Capabilities**: Precise timing for satellite communication and sensor sampling
- **Open Source**: Transparent, community-driven development aligned with conservation values

### Arribada's Development Strategy
Based on project documentation, Arribada standardizes on Zephyr RTOS to:
- Enable better collaboration and code review across projects
- Maintain consistent development practices
- Facilitate code reuse between conservation technologies
- Simplify developer onboarding and training

## Development Environment Setup

### Prerequisites
From documented development setup:
- **Operating System**: Linux, macOS, or Windows with WSL2
- **Python**: Version 3.8 or higher
- **Git**: For repository management
- **West**: Zephyr's meta-tool for project management

### Documented Installation Process

Based on actual developer experience with the EFM32 Happy Gecko starter kit:

#### 1. Install West (Zephyr's Meta-Tool)
```bash
pip3 install --user -U west
```

#### 2. Initialize Zephyr Workspace
```bash
west init zephyrproject
cd zephyrproject
west update
west zephyr-export
```

#### 3. Verify Installation with Hello World
```bash
# From the root of the zephyr repository
west build -b slstk3400a samples/hello_world
```

As documented: "Builds successfully 🎉"

### Arribada Zephyr Template

Arribada provides a standardized project template:
- **Repository**: [https://github.com/arribada/zephyr-template](https://github.com/arribada/zephyr-template)
- **Purpose**: Consistent development structure across projects

## Hardware Platform Support

### Documented Platforms

#### STM32WL Series
**Primary Platform**: STM32WL55JC for satellite connectivity
- **Projects**: Operation Pangolin wildlife tracking
- **Features**: Integrated LoRa/Sub-GHz radio, dual-core ARM Cortex-M4/M0+
- **Communication**: Kineis satellite network integration

#### EFM32 Series
**Development Platform**: EFM32 Happy Gecko
- **Build Target**: `slstk3400a`
- **Purpose**: Development and testing platform
- **Features**: Ultra-low power consumption, extensive peripheral set

## Real Project Implementations

### Operation Pangolin Tracker

Based on actual firmware development documentation:

#### Hardware Configuration
- **Magnetic Switch**: MK24 with default position closed
- **Wake-up Timer**: TPL5111 with configurable resistors (R3=287kΩ, R4=221kΩ for hourly wake-up)
- **Accelerometer**: BMA400 for motion-based wake-up
- **Communication**: UART via PA2 and PA3

#### Firmware Architecture
The documented firmware sequence includes:

1. **Initialization Phase**:
   - Flash configuration with application settings
   - Kineis configuration (ID, security key, radio settings)
   - Enter ready state with traceability procedures

2. **Runtime Operation**:
   - Magnet removal activates device
   - Battery level monitoring
   - Sequence counter increment
   - Satellite message transmission
   - Sleep mode between sequences

#### Configuration Parameters
```
AT+TRACKER=10,30,60,0,10
```
Where:
- 10 = messages per sequence
- 30 = seconds between messages  
- 60 = hardware timer period
- 0 = sequence timing mode
- 10 = low battery threshold (%)

### Argos SMD Module Integration

Based on documented implementation:
- **Base Repository**: [Arribada's Argos SMD firmware](https://github.com/arribada/argos-smd-at-kineis-firmware)
- **Satellite Network**: Kineis constellation
- **Localization**: Doppler-based positioning (requires 3-4 messages for initial fix)
- **Modulation**: VLDA4 for power optimisation

## Development Workflow

### Project Creation
From documented developer experience:

1. **Template-Based Setup**:
   ```bash
   # Use Arribada template
   git clone https://github.com/arribada/zephyr-template
   cd zephyr-template
   ```

2. **Application Development**:
   - Copy and modify sample applications
   - Follow established project structure
   - Maintain traceability with device IDs

### Build and Flash Process
```bash
# Build for specific target
west build -b [board_target] [application_path]

# Flash to device (drag and drop for development boards)
# Serial terminal verification
```

## Project-Specific Configurations

### GeoSeals Hub Development
From development notes mentioning "GeoSeals development work":
- Uses West environment setup
- Integration with RFID tracking systems
- Cellular communication capabilities

### TimeLord Project
Documentation references TimeLord project with:
- Zephyr application development
- EFM32HG platform targeting
- Debug environment setup

## Development Best Practices

### From Documented Experience
- **Start Simple**: Begin with Hello World samples
- **Use Templates**: Leverage Arribada's standardized template
- **Test Hardware**: Verify builds on actual target hardware
- **Maintain Traceability**: Each device requires proper ID management

### Power Optimization
Based on Operation Pangolin implementation:
- Timer-based wake-up systems (TPL5111)
- Configurable duty cycles
- Battery threshold management
- Motion-based activation options

## Common Issues and Solutions

### Build Environment Setup
From developer notes:
- Ensure Zephyr SDK is properly installed
- Verify west environment initialization
- Check board-specific dependencies

### Hardware Debugging
- Use UART for configuration and debugging (PA2/PA3)
- STM debug probe support via SWO (PB3)
- Drag-and-drop firmware flashing for development boards

## References

### Official Resources
- [Zephyr Project Documentation](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)
- [Arribada Zephyr Template](https://github.com/arribada/zephyr-template)
- [Argos SMD Firmware](https://github.com/arribada/argos-smd-at-kineis-firmware)

### Internal Documentation
- Operation Pangolin firmware development notes
- GeoSeals development experience
- TimeLord project Zephyr application development

---

*This documentation is based on actual development experiences and project implementations at Arribada Initiative.*