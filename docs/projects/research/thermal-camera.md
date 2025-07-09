# Thermal Camera Systems

*Heat signature detection for wildlife monitoring and anti-trafficking operations using Seek Thermal Mosaic Core.*

## Overview

Arribada's thermal camera systems use the Seek Thermal Mosaic Core 320x240 for wildlife monitoring in Operation Pangolin and similar conservation projects. The system has undergone iterative development to address field deployment challenges, particularly boot time latency issues.

**Current Status**: Version 2.0 development targeting sub-500ms trigger-to-capture latency using FOX D27 SBC with 153ms wake-up time

## Hardware Configuration

### Version 2.0 System Components
- **Thermal Sensor**: Seek Thermal Mosaic Core 320x240 with 4mm lens
- **Processing Unit**: FOX D27 Single Board Computer with RoadRunner System-on-Module
- **Trigger System**: Passive Infrared (PIR) sensor for motion detection
- **Power System**: AA Lithium batteries (replacing v1.0 LiPo batteries)
- **Storage**: SD card with Windows-accessible file system
- **Real-Time Clock**: Precision timestamping for image files

### Target Performance Specifications
- **Wake-up Time**: 153ms from GPIO interrupt (FOX D27 SBC)
- **Capture Latency**: Sub-500ms from trigger to image capture
- **Deployment Duration**: 90+ days autonomous operation
- **Image Format**: Timestamped thermal images (2024-10-25_22:03:00_0001.format)

## Project Development History

### Version 1.0 Issues
The initial system using Raspberry Pi Zero had a critical 6-second boot time issue that prevented capturing fast-moving animals. Additional problems identified during Cameroon field testing:

**Technical Issues:**
- 6-second boot time causing missed captures
- Images only accessible via virtual machine
- Multiple battery sources without clear labeling
- Delicate wiring and difficult SD card access
- Black enclosure causing overheating in hot climates
- No temperature or timestamp information on images
- Short PIR trigger distance compared to optical camera traps

**Usability Issues:**
- Too many fixings to open enclosure
- Lithium-Ion batteries difficult to ship/source remotely
- No operational status indicators
- Complex disassembly required for data retrieval

### Version 2.0 Design Requirements
To address v1.0 limitations, the v2.0 system specification includes:
- Sub-500ms capture latency (improvement from 5s to 0.5s)
- Windows-compatible file system for image access
- AA Lithium battery power system
- Simplified enclosure access
- Temperature and timestamp metadata
- Extended PIR detection range

## Seek Thermal Mosaic Core Integration

### SPI Interface Development Challenges
Arribada investigated developing custom SPI firmware for direct Mosaic Core communication. Key findings from Seek Thermal developer discussions:

**SPI Implementation Requirements:**
- Custom SPI driver development required
- Device must act as SPI slave (Mosaic Core is SPI master)
- No access to Seek SDK over SPI interface
- Raw 16-bit digital count data only (no temperature/thermography)
- User responsible for bad pixel correction, AGC, colourisation
- Significant development effort for custom image processing

**Available Support from Seek Thermal:**
- Encrypted SPI firmware provided for NXP4330 coprocessor
- SPI starter kits and integration documentation available under NDA
- ~1 second boot time achievable (vs 6s with full OS)
- Bad pixel correction and RDAC table switching handled automatically
- "Flat field" frames provided for intermittent correction

### Development Pathway Options
Seek Thermal consultation identified three implementation approaches:
1. **Hard way**: Custom SPI driver + partial SDK porting
2. **Middle way**: Use encrypted SPI firmware on coprocessor with custom image processing
3. **Soft way**: OS-based approach with ARM architecture (chosen for v1.0)

## Field Applications

### Operation Pangolin (Cameroon)
The thermal camera system is deployed as part of Operation Pangolin for anti-trafficking and wildlife monitoring:

**Detection Targets:**
- Human activity in protected areas
- Vehicle thermal signatures (motorcycles, trucks)
- Pangolin and other wildlife species
- Illegal logging and mining activities

**Integration Requirements:**
- Coordination with optical camera traps
- AudioMoth acoustic sensor synchronization
- GPS deployment location logging
- Compatible with Mbaza AI detection frameworks
- Support for TinyML on-device processing

**Environmental Deployment Conditions:**
- High humidity tropical forest environments
- Temperature extremes and rainfall exposure
- Risk of wildlife interference (elephants, predators)
- Remote locations with limited maintenance access
- Need for camouflage and anti-tampering measures

## Cameroon Field Feedback Requirements

### User Requirements from Field Testing
Based on roundtable discussions with end users in Cameroon:

**Core Functional Requirements:**
- Wide field of view thermal imaging for improved coverage
- Sub-0.5s latency improvement (from 5s baseline)
- Support for both video recording and still image capture
- Optional TinyML integration for early event filtering
- Compatibility with Mbaza AI detection frameworks

**Environmental & Deployment Requirements:**
- Harsh environment operation (humidity, heat, rain, dust)
- Wildlife interference resistance (elephants, predators)
- Effective camouflage capability (custom stickers, netting)
- Weatherproof and optionally fire-resistant housing
- Easy tree/pole deployment with adjustable mounting
- GPS tagging and deployment metadata logging
- Secure SD card access and anti-theft design

**Power & Maintenance Requirements:**
- Limited battery capacity operation (rechargeable lithium/AAA)
- Solar energy harvesting compatibility
- Ultra-low power design for multi-month deployments
- Minimal maintenance requirements
- Status indicators for operational verification

**Data & Integration Requirements:**
- Manual data retrieval workflows via SD card
- Metadata tagging and deployment log synchronization
- Large dataset local buffering
- Integration with optical camera traps and AudioMoth sensors
- Future GlobalML framework compatibility
- Community training and configuration simplicity

**Cost & Scalability:**
- Target ~$300/device cost for wide deployment
- Open-source hardware design
- Global manufacturing compatibility (India, Gabon, Cameroon)

## System Integration Notes

### Version 1.0 Implementation
The initial system used Raspberry Pi Zero with Diet Pi OS:

**Software Setup:**
- Oracle VirtualBox 6.1 with Ubuntu 20.x required for file access
- Seek IR Viewer from Seek Thermal Developer Portal
- GitHub repository: https://github.com/arribada/thermalcam-python
- nRF Adafruit Express Feather controller with custom firmware

**Hardware Configuration:**
- Raspberry Pi Zero W with specialised Diet Pi image
- nRF52 controller programmed via nrfjprog
- Seek Thermal Mosaic Core 320x240
- Custom pi-controller-zephyr firmware

### Developer Access Information
**Seek Thermal Developer Portal:**
- Account: alasdair@arribada.org
- Access to SPI documentation and starter kits
- NDA process available for SPI firmware
- Support forum for technical discussions

**Development Tools:**
- nRF Command Line Tools from Nordic
- JTAG and Segger J-link programming
- Win32DiskImager for Diet Pi image deployment

## Development Resources

### Version 1.0 Programming Instructions
For nRF Adafruit Express Feather controller:

1. Install nRF Command Line Tools from Nordic
2. Connect programming cable to nRF board
3. Open Command Prompt as administrator
4. Navigate to thermal_camera directory
5. Program with: `nrfjprog -f nrf52 --program pi-thermal-controller_timeout.hex --sectoranduicrerase --verify`

Firmware repository: https://github.com/arribada/pi-controller-zephyr

### Current Development Status
- Version 1.0 deployed and tested in Cameroon
- Version 2.0 development focused on FOX D27 SBC integration
- Target 153ms wake-up time validation in progress
- Custom SPI driver development under consideration
- Field feedback incorporation ongoing

## Technical Specifications Summary

### Seek Thermal Mosaic Core 320x240
- **Resolution**: 320x240 thermal imaging
- **Lens**: 4mm focal length
- **Interface Options**: USB (with SDK) or SPI (raw data)
- **Data Format**: 16-bit digital counts (SPI) or processed thermal data (USB)
- **Connector**: Hirose DF40C-24DP-0.4V(51)
- **Coprocessor**: LPC4330FET100 (Cortex M0+M4, up to 204 MHz)

### FOX D27 SBC Target Specifications
- **SoM**: RoadRunner System-on-Module
- **Wake-up Time**: 153ms from GPIO interrupt
- **Real-Time Clock**: For precision timestamping
- **GPIO**: Direct PIR sensor interface
- **SD Card**: Windows-compatible file system support

### Power Requirements (Version 2.0)
- **Battery Type**: AA Lithium (6x configuration)
- **Target Deployment**: 90+ days autonomous operation
- **Trigger System**: PIR sensor with GPIO wake-up
- **Low Power Mode**: Deep sleep between captures

## System Block Diagram

### Version 2.0 Architecture
High-level system components and data flow:

- **PIR Sensor** → GPIO wake-up → **FOX D27 SBC**
- **Seek Thermal Mosaic Core** → SPI interface → **FOX D27 SBC**  
- **Real-Time Clock** → Timestamp data → **FOX D27 SBC**
- **FOX D27 SBC** → Image processing → **SD Card Storage**
- **AA Lithium Batteries** → Power management → **System Power**

### Software Flow
1. System in deep sleep mode
2. PIR sensor detects motion → GPIO interrupt
3. FOX D27 SBC wakes up (153ms target)
4. Capture 10-frame thermal image burst
5. Apply timestamp and metadata
6. Save to SD card (Windows-compatible format)
7. Return to deep sleep mode

### Development Timeline
- **Version 1.0**: Completed, deployed in Cameroon (6s boot time issue)
- **Version 2.0**: In development, targeting 153ms wake-up validation
- **Future**: SPI custom firmware implementation under consideration

---

*The thermal camera system demonstrates Arribada's iterative approach to addressing real-world deployment challenges in conservation technology, with Version 2.0 development focused on critical performance improvements identified through field testing.*