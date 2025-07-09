# GeoSeals Project

## Overview

GeoSeals is a humanitarian aid monitoring system developed in partnership with UNICEF and WFP to track Ready-to-Use Therapeutic Food (RUTF) and Ready-to-Use Supplementary Food (RUSF) throughout supply chains in Ethiopia. The project uses UHF RFID technology to prevent stock-outs and optimise aid distribution to health centres and health points.

## Project Status

- **Status**: Proof of Concept Deployed
- **Partners**: UNICEF, World Food Programme (WFP), Ethiopian Ministry of Health
- **Location**: Ethiopia (Jijiga region)
- **Technology**: UHF RFID tracking with cellular connectivity

## Technical Architecture

### System Design

The GeoSeals system consists of two main components:

#### 1. GeoSeals Hubs
- **Deployment**: Mounted above doorways at warehouses and health facilities
- **Detection**: PIR sensor triggers RFID scanning when personnel approach
- **Communication**: Cellular connectivity via Blues Notecard LTE modem
- **Power**: Solar panel with lithium battery backup
- **Enclosure**: IP65-rated protection for harsh environments

#### 2. GeoSeals Tags
- **Technology**: UHF RFID labels (Avery Dennison RF600593)
- **Application**: Applied to RUTF/RUSF packaging
- **Cost**: £0.18 per tag
- **Range**: Detectable up to 5 metres

### Technical Specifications

#### Hub Hardware
- **Microcontroller**: ESP32 (ESPWROOM-32)
- **RFID Reader**: SparkFun M6E Nano (UHF)
- **Cellular Modem**: Blues Notecard LTE Cat-1 EMEA
- **Motion Detection**: PIR sensor for power optimisation
- **Power System**: 6V solar panel + 3000mAh lithium battery
- **Dimensions**: Hammond 1555NF42GY enclosure
- **Cost**: £428.90 (internal antenna) / £459.21 (external antenna)

#### Software Architecture
- **Firmware**: Zephyr RTOS
- **Cloud Platform**: Datacake for data aggregation and visualization
- **Communication**: Cellular data transmission at configurable intervals
- **Power Management**: Sleep mode with PIR wake-up

## Supply Chain Integration

### UNICEF Supply Chain
- **Structure**: 5-stage distribution from main warehouse to health facilities
- **Packaging**: Pallets of 72 RUTF boxes
- **Deployment**: Jijiga Warehouse and downstream health centres
- **Challenge**: Multi-stage tracking through various facility types

### WFP Supply Chain
- **Structure**: Direct delivery from main warehouse to clinics
- **Product**: RUSF individually handled
- **Advantage**: Simplified two-point tracking system

## Deployment Locations

The proof of concept was deployed across multiple facility types:

### Warehouses
- **Infrastructure**: Mains electricity available
- **Challenges**: Large doorways (5-6m high), forklift interference
- **Detection**: High-power external antennas for full pallet detection

### Health Centers/Health Points
- **Infrastructure**: No mains electricity (solar powered)
- **Environment**: Standard doorways (~2.2m high)
- **Storage**: Single-entry storerooms with varying sizes

## Ethical Framework

### Core Principles
1. **Do No Harm**: All activities assessed for potential negative impacts
2. **Human Rights**: Respect for privacy, dignity, and access to resources
3. **Transparency**: Clear communication with all stakeholders
4. **Equity**: Fair treatment regardless of personal characteristics
5. **Data Responsibility**: Robust privacy and security protections

### Governance Structure
- **Ethics Committee**: Representatives from Arribada, UNICEF, WFP, and independent experts
- **Review Process**: Annual ethics audits and framework updates
- **Reporting**: Annual transparency reports on ethical compliance

## Field Test Results

### Validation Testing (UK)
- **Power Performance**: Nominal operation on battery and solar charging
- **Detection Speed**: RFID wake-up in < 500ms on PIR trigger
- **Range Testing**: Successful tag detection at designed distances
- **Data Transmission**: Reliable cellular connectivity to cloud platform

### Ethiopia Deployment
- **15 Hubs Deployed**: Serial codes GEO-HUB-0001 through GEO-HUB-0015
- **Successful Detection**: RFID tags detected through doorways
- **Data Logging**: Unix timestamps and tag IDs transmitted to cloud
- **Batch Processing**: Multiple tag IDs saved and transmitted together

## Key Achievements

1. **Technology Validation**: Proven RFID detection in real-world humanitarian logistics
2. **Partnership Success**: Strong collaboration with major humanitarian organisations
3. **Scalable Design**: Modular system suitable for various facility types
4. **Cost Optimization**: Affordable per-unit costs for large-scale deployment
5. **Ethical Compliance**: Comprehensive framework addressing humanitarian concerns

## Development Resources

### Hardware
- **PCB Design**: Custom Arribada carrier board (PCB-AB01-006-001A)
- **Bill of Materials**: Complete sourcing from SparkFun, Blues, Seeed Studio
- **Enclosure Design**: Weather-resistant mounting solutions

### Software
- **Web Flasher**: [GeoSeals Web Flasher](https://arribada.github.io/geoseals-web-flasher/)
- **Firmware**: Zephyr RTOS with cellular connectivity
- **Cloud Integration**: Datacake dashboard for real-time monitoring

## Future Development

### Phase 2 Objectives
1. **Scale Deployment**: Expand to 100+ hubs across Ethiopia
2. **System Integration**: Direct integration with UNICEF/WFP inventory systems
3. **Advanced Analytics**: Predictive stock-out prevention algorithms
4. **Multi-Country Expansion**: Adaptation to other humanitarian contexts

### Technical Roadmap
- **Improved Power Management**: Extended battery life optimisation
- **Enhanced Connectivity**: 5G and satellite backup options
- **Machine Learning**: Automated anomaly detection in supply chains
- **Mobile Applications**: Field worker interfaces for real-time status

## Contact Information

- **Project Lead**: Ruby Lee (ruby@arribada.org)
- **Technical Lead**: Alex (alex@arribada.org)
- **Hardware Lead**: Alasdair (alasdair@arribada.org)

---

*Transforming humanitarian aid distribution through technology • Partnership with UNICEF and WFP • Deployed in Ethiopia*