# Timelapse Camera Systems

*Open-source timelapse cameras for long-term environmental monitoring and wildlife research.*

## Overview

Arribada has developed multiple generations of timelapse camera systems for conservation research, with the most notable deployment being the multi-year Antarctic penguin colony study. Current development focuses on a Raspberry Pi Pico 2040-based system with Arducam Mega 5MP sensor.

**Current Status**: SPI-based design specification completed, with proven Antarctica deployment heritage from earlier IRNAS-designed systems

## System Specifications

### Current Development Platform
- **Microcontroller**: Raspberry Pi Pico 2040W (dual-core ARM Cortex-M0+ at 133MHz)
- **Camera Sensor**: Arducam Mega 5MP over SPI interface
- **Operating System**: Zephyr RTOS
- **Storage**: MicroSD card for image storage
- **Connectivity**: WiFi (RP2040W variant)
- **Configuration**: JSON-based config file system

### Target Features
- **Image Capture**: Configurable resolution and quality settings
- **Timelapse Intervals**: Programmable from seconds to days
- **Camera Controls**: Contrast, saturation, sharpness adjustment
- **Power Management**: Optimized for extended autonomous deployment
- **Solar Compatibility**: Support for solar panel charging

### Development Scope
As specified in the SPI Camera Spec, the project includes:
- 6 weeks of software development work
- Zephyr RTOS application for timelapse camera
- Standalone open-source Arducam Mega SPI driver
- Version-controlled repositories and supporting documentation

## Antarctic Research Heritage

### Penguin Colony Monitoring (2017-2025)
Arribada's timelapse systems have been successfully deployed in Antarctica for multi-year penguin colony studies:

**Deployment History:**
- **King Penguin Colony**: 16-day initial deployment with 10-minute capture intervals
- **Gentoo Penguin Colony**: Extended 300+ day deployment
- **Environmental Conditions**: Extreme Antarctic conditions (-40°C to +10°C)
- **Data Collection**: >100,000 images documenting breeding behavior
- **System Reliability**: 94% uptime in harsh polar conditions

**Research Applications:**
- Complete breeding cycle documentation
- Population counting and demographic analysis
- Feeding patterns and chick development tracking
- Climate correlation studies with activity patterns

### Penguin Cam V1.0 Hardware
The current operational system based on earlier IRNAS designs includes:

**Main Components:**
- Canon 2000D camera with USB power adapter
- Raspberry Pi Zero W controller
- Adafruit Feather nRF52840 Express
- 7.4V 5200mAh Li-Ion battery system
- Peli Case 1300 weatherproof enclosure
- Custom 3D-printed mounting and window systems

## Penguin Cam V1.0 Assembly

### Bill of Materials
The current operational system requires the following components:

**Electronic Components:**
- Canon 2000D camera with USB power adapter
- Raspberry Pi Zero W
- Adafruit Feather nRF52840 Express
- 5V Buck Converter Breakout
- 7.4V 5200mAh Li-Ion Battery

**Mechanical Components:**
- Peli Case 1300 weatherproof enclosure
- M2.5, M4, and M6 bolts and nuts (various lengths)
- M4 Self Tapping Inserts
- 1/4-20 UNC to M6 Male to Male Adapter
- Araldite adhesive
- Custom 3D-printed parts:
  - Base Frame
  - Camera Adapter Plate  
  - PCB Plate
  - Left and Right Battery Boxes with lids
  - Flanged Front Window Holder
  - Flanged Rear Window Frame

### Assembly Process
Key assembly steps include:
1. Cut Peli Case window hole using cutting guide
2. Install clear window with O-ring seals
3. Mount electronic components to 3D-printed plates
4. Install M4 nut inserts in base frame
5. Assemble complete system with proper waterproofing

### 2023 Redesign Plans
Alex Bucknall initiated plans to redesign the original IRNAS-made cameras deployed by Tom Hart in Antarctica in 2018. These redesign plans were started but not completed due to funding limitations.

## SPI Camera Development Specification

### Project Requirements
The current development effort is specified as a low-cost SPI timelapse camera with the following requirements:

**Hardware Platform:**
- Raspberry Pi Pico 2040W microcontroller
- Arducam Mega 5MP camera sensor over SPI interface
- MicroSD card for image storage
- Solar panel compatibility for extended deployment

**Software Requirements:**
- Built on Zephyr RTOS
- JSON-based configuration file system (config.json)
- Configurable capture intervals and camera settings
- Standalone open-source Arducam Mega SPI driver

**Configuration Parameters:**
- Capture interval (programmable timing)
- Image resolution and quality settings
- Camera controls: contrast, saturation, sharpness
- Automatic exposure control options

**Development Deliverables:**
- Two version-controlled Git repositories:
  1. Timelapse camera Zephyr RTOS application
  2. Arducam Zephyr RTOS SPI driver
- Supporting documentation for both components
- Up to 6 weeks of software development work

### Project Context
This specification builds on Arribada's experience with Antarctic timelapse deployments and aims to create a more cost-effective, manufacturable solution suitable for widespread conservation research applications.

## Development Status

### Current State
- **SPI Camera Specification**: Completed design document available
- **Hardware Platform**: Raspberry Pi Pico 2040W selected
- **Camera Sensor**: Arducam Mega 5MP over SPI interface specified
- **Operating System**: Zephyr RTOS chosen for implementation
- **Development Timeline**: 6 weeks software development work scoped

### Deliverables Planned
1. **Timelapse Camera Application**: Zephyr RTOS-based application with JSON configuration
2. **Arducam SPI Driver**: Standalone open-source driver for Zephyr
3. **Documentation**: Supporting guides for both application and driver
4. **Version Control**: Two separate Git repositories for modular development

### Historical Context
The current development builds on:
- **Antarctic Heritage**: Multi-year deployments with >100,000 images collected
- **IRNAS Collaboration**: Original designs from Tom Hart's 2018 Antarctic deployments  
- **Arribada Innovation**: 2023 redesign plans initiated by Alex Bucknall
- **Field Experience**: Proven reliability in extreme environmental conditions

### Technical Resources
- **SPI Camera Spec Document**: Available at Google Docs
- **Time_Lapse_Camera_Spec.pdf**: Referenced in project documentation
- **Penguin Cam Assembly Guide**: Detailed build instructions for V1.0 system
- **Heritage Documentation**: Press files and historical deployment records available

## Technical Implementation Framework

### JSON Configuration System
The system uses a JSON-based configuration approach for field deployment settings:

**Configuration Categories:**
- **Capture Settings**: Interval timing, resolution, quality parameters
- **Camera Controls**: Contrast, saturation, sharpness adjustments  
- **Exposure Management**: Automatic vs manual exposure control
- **Power Management**: Sleep modes, battery thresholds, solar charging
- **Storage Options**: File formats, compression, capacity limits
- **Metadata**: Location, project details, deployment information

### Arducam Mega SPI Interface
The specification calls for a standalone open-source SPI driver that provides:

**Hardware Interface:**
- 8MHz SPI communication with Arducam Mega 5MP sensor
- GPIO control for camera reset and chip select
- JPEG, RGB565, and YUV422 format support
- Configurable image resolution and quality settings

**Zephyr Integration:**
- Device tree configuration for hardware abstraction
- Standard camera driver API implementation
- Power management integration for sleep modes
- Error handling and timeout management

### Development Architecture
The modular approach separates concerns:
- **Application Layer**: Timelapse logic, configuration management, file handling
- **Driver Layer**: Hardware-specific Arducam Mega SPI communication
- **Platform Layer**: Zephyr RTOS services, GPIO, storage, power management

## Project Documentation References

### Available Resources
- **SPI Camera Spec Document**: Detailed requirements at Google Docs link
- **Time_Lapse_Camera_Spec.pdf**: Comprehensive specification document
- **Penguin Cam V1.0 Assembly Guide**: Step-by-step build instructions with images
- **Heritage Google Drive**: ArribadaInitative archive with historical documentation
- **Press Files**: Historic media coverage of Antarctic timelapse deployments
- **2023 Time-lapse Camera Plan**: Alex Bucknall's redesign documentation

### Development Timeline
The current project represents a significant evolution:
- **2017-2025**: Antarctic deployments with IRNAS-designed systems
- **2018**: Tom Hart's original camera deployments
- **2023**: Alex Bucknall redesign initiative (funding limited)
- **Current**: SPI-based system specification completed
- **Future**: 6-week development implementation planned

### Technical Legacy
Building on proven Antarctica experience:
- **300+ day deployments** in extreme conditions
- **>100,000 images** successfully captured
- **94% system reliability** in harsh polar environment
- **Breeding cycle documentation** for multiple penguin species
- **Population analysis** through automated image processing

## Future Development Path

### Immediate Development Goals
- **Complete SPI Driver**: Implement Arducam Mega 5MP driver for Zephyr RTOS
- **Application Framework**: Build timelapse capture application with JSON configuration
- **Power Optimization**: Implement efficient sleep/wake cycles for extended deployment
- **Field Testing**: Validate system performance against Antarctica deployment standards

### Long-term Vision
The timelapse camera system aims to:
- **Democratize Access**: Provide low-cost alternative to commercial camera trap systems
- **Enable Research**: Support long-term environmental monitoring projects globally
- **Maintain Standards**: Preserve research-grade data quality and reliability
- **Foster Community**: Continue open-source development and collaboration

### Success Metrics
Measured against Antarctic deployment heritage:
- **Reliability**: Target 94%+ system uptime in harsh conditions
- **Longevity**: Support 300+ day autonomous deployments
- **Data Quality**: Maintain consistent image capture across environmental variations
- **Cost Effectiveness**: Achieve significant cost reduction vs commercial alternatives

---

*Building on proven Antarctic heritage to create accessible, open-source timelapse technology for conservation research worldwide.*

