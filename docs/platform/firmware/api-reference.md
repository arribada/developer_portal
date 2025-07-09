# Firmware Development Reference

## Overview

This document provides references to Arribada's firmware development resources based on documented projects and hardware implementations.

## Development Foundation

### Zephyr RTOS Platform

Arribada standardizes on Zephyr RTOS for embedded development across conservation technology projects. As documented in our internal development notes:

> "I had already installed the west environment for the GeoSeals development work. I followed this guide: https://docs.zephyrproject.org/latest/develop/getting_started/index.html"

Development is based on the [Arribada Zephyr Template](https://github.com/arribada/zephyr-template) repository which provides standardized project structure.

### Supported Hardware Platforms

#### STM32WL Series
Based on the Operation Pangolin project documentation:
- **Primary Platform**: STM32WL55JC for satellite connectivity
- **Use Cases**: Wildlife tracking with satellite communication
- **Features**: Integrated LoRa/Sub-GHz radio support

#### EFM32 Series  
From development notes on the EFM32 Happy Gecko starter kit:
- **Platform**: EFM32 Happy Gecko for development and testing
- **Build Target**: `slstk3400a` in Zephyr

## Firmware Architecture References

### Operation Pangolin Implementation

Based on documented firmware development notes, the OP-Tracker firmware follows this architecture:

**Hardware Configuration:**
- SW1: MK24 magnetic switch (default closed)
- UART communication via PA2 and PA3
- BMA400 accelerometer for wake-up capability
- TPL5111 timer for periodic operation

**Key Parameters (Flash Configuration):**
- `u64_startup_counter`: 64-bit startup counter
- `u8_msg_counter`: Number of messages per sequence (0-255)
- `u8_wait_msg_timer_s`: Seconds between messages (0-255)
- `u8_wait_startup_restimer_min`: Minutes between hardware startup
- `u8_bat_level_threshold`: Battery level threshold with low battery flag

### Argos SMD Module

The firmware builds upon the Argos SMD module firmware:
- Repository: [Arribada's GitHub](https://github.com/arribada/argos-smd-at-kineis-firmware)
- Communication: Kineis satellite network with Doppler localisation
- Configuration: UART link for configuration and debugging
- Message Format: VLDA4 modulation for power optimisation

## Project-Specific Implementations

### BSP Pin Definitions (Operation Pangolin)

**Analog Pins:**
- VBAT_SENSE = PB13

**Digital Control:**
- MCU_DONE = PB9
- POWER_MODE = PC0 (Always High)

**UART Communication:**
- TX = PA2
- RX = PA3

**Accelerometer Interface:**
- INT1 = PB7
- INT2 = PB6
- Power control = PA15 (optional)

## Development Environment

### Required Tools
- West meta-tool for Zephyr project management
- Zephyr SDK for cross-compilation
- Standard build tools (CMake, Python)

### Build Process
```bash
west init zephyrproject 
cd zephyrproject
west update
west zephyr-export
west build -b [board_target] [application_path]
```

## Configuration Requirements

### AT Command Configuration (Operation Pangolin)
Example configuration format:
```
AT+TRACKER=10,30,60,0,10 
```
Parameters:
- 10 messages per sequence
- 30s interval between messages
- 1 hour resistor timer
- Every wakeup starts sequence
- 10% low battery threshold

## Hardware Specifications

### Power Management
- TPL5111 timer-based wake-up system
- Configurable duty cycles via resistor values
- Battery monitoring with threshold-based operation

### Communication Interfaces
- Kineis satellite uplink (no downlink support)
- UART for configuration and debugging
- Optional I2C interface (SCL=PA10, SDA=PA9)

## References

- [Arribada Zephyr Template](https://github.com/arribada/zephyr-template)
- [Argos SMD Firmware](https://github.com/arribada/argos-smd-at-kineis-firmware)
- [Zephyr Project Documentation](https://docs.zephyrproject.org/)

---

*This documentation is based on actual project implementations and development notes from Arribada's conservation technology projects.*