# Argos SMD Module

## Overview

The Argos SMD module is a compact, high-performance PCB designed to facilitate satellite uplink communication for a wide range of applications. With its small footprint and versatile integration options, this module can stand alone or be a coprocessor for designs requiring satellite connectivity. Built on the STM32WL55 processor and equipped with the GR5504 power amplifier, the module delivers up to 27 dBm transmission power and is fully certified by CLS, ensuring immediate deployment readiness.

## Key Features

- **Compact Design**: Castellated edges for easy integration into new or existing designs
- **High Efficiency**: Built on the STM32WL55 with a GR5504 amplifier for reliable satellite uplink with low power consumption
- **Integration Options**: Feather breakout board for seamless testing and integration; only power is necessary
- **Flexibility**: Can be used as a standalone or RF module
- **Kineis Compatibility**: Fully compatible with KINEIS stack and KINEIS GUI; certified by CLS

## Technical Specifications

### Dimensions
- **Size**: 20mm × 20mm × 2mm
- **Weight**: < 1 gram

### Power Supply Voltages
- **Core Supply (VDD)**: 1.8V to 3.6V, typical 3.3V
- **Backup Supply (VBAT)**: 1.55V to 3.6V  
- **External Power Amplifier (VDD_EXTPA)**: 3.3V

### Power Consumption
- **TX Power**: 27 dBm (~500 mW)
- **Current**: 165.13 mA typical, max 292.4 mA

### Environmental Specifications
- **Operating Temperature**: −40°C to +85°C
- **Storage Temperature**: −55°C to +150°C
- **Humidity Resistance**: Up to 95% relative humidity
- **Moisture Sensitivity**: MSL 1
- **RoHS Compliance**: Yes

## Integration and Design

### Power Management
The STM32 and external power amplifier require separate power supplies. The TPS63901 is recommended for powering the external PA. Transmission power can be managed via software. For tuning transmission power or enabling calibration, a tunable regulator may be useful (MCP4716).

### Antenna Integration
Includes a PI-filter for the antenna output on your design; RF shield optional.

### Breakout Board
Available for testing and integration examples, compatible with Feather boards.

**Repository**: [Arribada Breakout Board](https://github.com/arribada/featherwings-argos-smd-hw)

## Software and Communication

### Firmware
- Based on the latest Kineis firmware
- Working with UART and AT commands
- **Repository**: [Firmware](https://github.com/arribada/argos-smd-at-kineis-firmware)

### Testing Interface
- Compatible with KimGUI interface via UART
- **Arduino Example**: [Arduino Example](https://github.com/arribada/argos-smd-test-arduino)

### Zephyr Driver
Supported for integration with Feather boards.
**Repository**: [Zephyr Driver](https://github.com/arribada/argos-smd-driver-zephyr)

## Hardware Resources

### Hardware Repositories
- **SMD Module Hardware**: [argos-smd-hw](https://github.com/arribada/argos-smd-hw)
- **Featherwing Breakout Board**: [featherwings-argos-smd-hw](https://github.com/arribada/featherwings-argos-smd-hw)

### Software Repositories
- **Firmware**: [argos-smd-at-kineis-firmware](https://github.com/arribada/argos-smd-at-kineis-firmware)
- **Arduino Example**: [argos-smd-test-arduino](https://github.com/arribada/argos-smd-test-arduino)
- **Zephyr Driver**: [argos-smd-driver-zephyr](https://github.com/arribada/argos-smd-driver-zephyr)

## Applications

The Argos SMD module is ideal for:
- **Wildlife Tracking**: Ultra-lightweight tags for endangered species monitoring
- **Marine Research**: Oceanographic sensors and marine mammal tracking
- **Environmental Monitoring**: Remote sensor networks in harsh environments
- **Conservation Technology**: Custom applications requiring satellite connectivity

## Getting Started

1. **Hardware Integration**: Review the [integration specifications](/docs/hardware/integration/mechanical-design)
2. **Development Kit**: Order the [Featherwing breakout board](/docs/hardware/catalog/dev-kits)
3. **Firmware Development**: Start with the [Zephyr integration guide](/docs/platform/firmware/zephyr-integration)
4. **Testing**: Use KimGUI for initial testing and validation

## Support

- **Technical Documentation**: [Hardware specifications](/docs/hardware/specs/datasheets)
- **Community Support**: [Developer forum](/community)
- **Professional Services**: [Contact our team](mailto:support@arribada.org) for custom integration support

---

*CLS-certified for immediate deployment • Open-source hardware and software • Global satellite coverage*