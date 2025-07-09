# RSPB Avian Research Partnership

## Overview

This document describes Arribada's collaboration with the Royal Society for the Protection of Birds (RSPB) and National Geographic on developing low-cost satellite tracking technology for endangered bird species monitoring.

**Project Status**: Development phase with hardware prototyping and field testing coordination

## Project Background

### Partnership Context

The context and scope of this project are grounded in the critical need to revolutionize avian tracking for conservation purposes. Traditional tracking devices have been valuable tools in monitoring animal movements and migration, but the high costs associated with them have limited their accessibility, particularly in developing regions.

The project represents:
- Collaboration between Arribada Initiative, RSPB, and National Geographic
- Technology transfer from Sea to Source Expedition marine plastic tracking
- Open-source approach to democratize conservation tracking technology

### Cost Reduction Initiative

Current commercial tracking solutions present significant barriers:
- **Commercial trackers**: Often exceeding £2,000 per unit
- **Target cost**: Under £500 per unit
- **Weight constraint**: < 3% of bird's body weight per conventional guidelines

## Target Species

### Conservation Focus Areas

Based on project documentation, the research platform targets three critically endangered species:

#### Indian Vulture (*Gyps indicus*)
- **Status**: Critically Endangered
- **Weight**: 4-6 kg  
- **Minimum weight in range**: 4kg
- **Tag weight allowance**: < 3% body weight (~120g)

#### Philippine Eagle (*Pithecophaga jefferyi*)
- **Status**: Critically Endangered
- **Distribution**: Philippines
- **Conservation need**: Population monitoring and habitat protection

#### Shoebill Stork (*Balaeniceps rex*)
- **Status**: Vulnerable
- **Distribution**: Uganda and surrounding regions
- **Conservation focus**: Wetland habitat monitoring

## Technical Platform

### Hardware Architecture

Based on documented development:

**STM32WL-Based Design**:
- STM32WL55JC dual-core ARM Cortex-M4/M0+ processor
- Argos satellite communication via Kineis network
- Modular design using Adafruit Feather compatibility

**Development Boards**:
- **SMD Module**: BGA_RF-ArticGR v0.1d (5 PCBAs produced for RF testing)
- **Breakout Board**: Wings_SMD_Breakout v0.1c (50 PCBs produced)
- **Sensor Board**: Wings_GNSS v0.1b (under review as of documentation date)

### Physical Constraints

**Board Dimensions** (from RSPB specifications):
- Main board: 50x21x11 mm (Length x Width x Thickness)
- Weight targets based on species requirements
- Solar charging capability for extended operation

### Power Management

**Battery Research** (from documented battery selection process):

**LiPo Options Evaluated**:
- 50x30x10mm: 1500mAh, 26g (for larger species)
- 50x20x10mm: 1000mAh, ~18g
- 50x20x5mm: 500mAh, with 2.54mm connector
- 48x22x3mm: 300mAh, 5.5g (ultra-lightweight option)

**Li-Ion Options**:
- LP10440: 350mAh, 8.4g (43x10.25mm)
- LP14500A: Higher capacity for longer deployments

## Development Phases

### Three-Stage Development Process

Based on documented planning:

#### Stage 1: Component Development
- Individual hardware component creation
- SMD module for Argos communication
- Wings boards for sensor integration
- Feather MCU integration testing

**Completed Deliverables**:
- RF power output optimisation
- RF harmonics filtering and impedance matching
- MCU integration with SMD and Wings modules
- Basic tracking demonstration

#### Stage 2: Integration & Optimization
- Enhanced SMD module with potential downlink capability
- Merged Wings board design
- Firmware and application development priority
- Real environment testing with RSPB

#### Stage 3: Production & Deployment
- User experience optimisation
- Production process establishment
- Field deployment with conservation partners
- 50-unit production run for multi-continent deployment

## Communication Technology

### Argos Satellite System

**CLS/Kinéis Constellation**:
- Polar Low Earth Orbit satellites (500-850km altitude)
- ~95-100 minute orbital periods
- Sun-synchronous orbits for predictable coverage
- Global coverage with polar optimisation

**Message Types Supported**:
- VLDA4: Standard positioning messages
- LDK packets: Alternative data transmission
- A2 packets: Enhanced capability

**Performance Specifications**:
- **Doppler localisation**: ±150m accuracy
- **GNSS integration**: ±50m accuracy when combined
- **Power optimisation**: VLDA4 modulation for efficiency

## Field Applications

### Research Capabilities

**Data Collection**:
- Position tracking via Doppler localisation
- Behavioral monitoring through accelerometer
- Environmental sensor integration
- Mortality detection algorithms

**Operational Features**:
- Solar charging for extended deployment
- Configurable duty cycles
- Reed switch activation
- USB and wireless charging options

### Deployment Requirements

**Species-Specific Adaptations**:
- Weight calculations per individual bird
- Attachment methodology validation
- Regional partnership coordination

**Geographic Deployment**:
- **UK**: Initial testing with RSPB partners
- **Nepal**: Vulture conservation programs
- **Philippines**: Philippine Eagle Foundation collaboration  
- **Uganda**: Shoebill habitat monitoring

## Development Resources

### Hardware Repository
**GitHub**: https://github.com/arribada/stm32wl-dev

**Available Designs**:
- SMD module schematics and PCB layouts
- Wings breakout board designs
- Feather integration specifications

### Software Components

**Firmware Development**:
- **libkineis**: v4.2.2 satellite communication library
- **SMD_tracker**: STM32 HAL-based firmware
- **Horizonx_SMD**: Main scheduler for Feather MCU
- **horizonx_app**: Device configuration application

### Testing Infrastructure

**RF Testing Requirements**:
- Multimeter, Oscilloscope, and Spectrogram analysis
- Battery life validation testing
- Real-world performance evaluation
- Species-specific deployment trials

## Partnership Network

### Primary Collaborators

**RSPB (Royal Society for the Protection of Birds)**:
- UK-based testing and validation
- Species-specific deployment expertise
- Field testing coordination

**National Geographic Society**:
- Technology heritage from Sea to Source Expedition
- Global conservation network access
- Technical validation and support

### Regional Conservation Partners

**Field Deployment Support**:
- Nepal vulture conservation organizations
- Philippine Eagle Foundation
- Uganda Shoebill research groups
- Open-source community development

## Project Impact

### Conservation Technology Democratization

**Cost Accessibility**:
- 75% cost reduction compared to commercial alternatives
- Open-source hardware and software designs
- Regional production capability development

**Technical Innovation**:
- Modular design for species adaptation
- Solar-powered sustainable operation
- Multi-modal data collection capability

---

*This documentation is based on actual project documentation from Arribada's RSPB partnership and technical development notes.*