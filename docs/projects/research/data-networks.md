# Distributed Data Collection Networks

*LoRaWAN networks for remote environmental monitoring and sea turtle tracking in French Guiana.*

## Overview

Arribada has deployed operational LoRaWAN networks for conservation research, with the largest deployment in French Guiana supporting sea turtle monitoring through a partnership with WWF and GEPOG. These networks demonstrate how distributed communication infrastructure can enable large-scale wildlife tracking in challenging tropical environments.

## French Guiana Sea Turtle Monitoring Network

### Project Overview

Arribada's largest operational LoRaWAN network is deployed in partnership with WWF and GEPOG across three islands in French Guiana. The network supports leatherback sea turtle monitoring with 24 active tracking devices and three solar-powered gateways operating autonomously in challenging tropical conditions.

### Network Configuration
**Gateway Sites:**
- **Site 1: Île de La Mère (Larivot)**
  - Coordinates: -5.2781, -52.9336
  - Gateway EUI: AC1F09FFFE103450
  - SIM Card: 06 94 40 02 94
  - Serial: 918100QN6040319027

- **Site 2: Île de l'enfant perdu (Soula)**
  - Coordinates: -5.2891, -52.9156
  - Gateway EUI: AC1F09FFFE103452
  - SIM Card: 06 94 40 16 67
  - Serial: 918100QN6040319028

- **Site 3: Île Royale (Montsinery)**
  - Coordinates: -5.2766, -52.9226
  - Gateway EUI: AC1F09FFFE10344E
  - SIM Card: 06 94 40 04 98
  - Serial: 918100QN6040319026

**Hardware Configuration:**
- Gateway Model: RAK7289V2
- Battery System: RAK9155 Battery Plus
- Solar Panel: RAKwireless Solar Panel Kit 2024
- Frequency Plan: EU868 (French Guiana)
- Network Server: The Things Network (wss://eu1.cloud.thethings.network:8887)

**Device Fleet:**
- 24 active Icoteq LoRaWAN sea turtle tags
- Transmission on GPS fix acquisition
- Battery life: 18+ months
- JoinEUI: 1122334455667788
- AppKey: 2B7E151628AED2A6ABF7158809CF4F3C

### Gateway Installation Process

The French Guiana deployment follows a standardized installation checklist developed for tropical environments. Key considerations include:

**Site Requirements:**
- Pole diameter support: 50-100mm (gateway), 50-75mm (battery)
- Cellular coverage for 4G backhaul
- Solar panel orientation: 5-10° south inclination for French Guiana latitude
- IP67 environmental protection for tropical conditions

**Power System Configuration:**
- RAK9155 Battery Plus for 7+ days autonomy
- Solar charging with RAKwireless 2024 panel kit
- Cellular connectivity via Orange network (APN: orangeweb)

**Network Configuration:**
- Basic Station protocol to The Things Network
- TLS authentication with server certificates
- EU868 frequency plan for French Guiana
- Vertical polarization omnidirectional antenna

### Device Configuration

The Icoteq LoRaWAN sea turtle tags are configured for marine environment operation with the following parameters:

**LoRaWAN Settings:**
- Join Mode: OTAA (Over-The-Air Activation)
- Adaptive Data Rate: Enabled
- Maximum TX Power: 14 dBm
- Duty Cycle: Disabled for research applications
- Link Check: Enabled when surfaced (5s period, 3 fail threshold)

**GPS Configuration:**
- GPS Mode: AssistNowHybrid (requires almanac file)
- GPS Model: SEA (optimised for marine environment)
- GPS Period: 180 seconds (3 minutes between fixes)
- GPS Timeout: 300 seconds (5 minutes maximum search time)
- Horizontal Accuracy Threshold: 50 metres
- HDOP Threshold: 5 (moderate accuracy acceptable)

**Behavioral Triggers:**
- Ping on Joined: True
- Ping on Surfaced: True (enabled for sea turtle monitoring)
- GPS on Surfaced: True
- Saltwater Switch: Enabled
- Accelerometer Ping: False
- LoRa Geofence: False (could be configured for gateway regions)

### Active Device Fleet

The network currently supports 24 operational sea turtle tags divided between WWF and GEPOG research partners:

**WWF Tags (20 devices):**
| Tag ID | DeviceEUI | Unique ID |
|--------|-----------|----------|
| tag-v11-171E9CE4 | 1C07E8F1171E9CE4 | 171E9CE4 |
| tag-v12-b478ea90 | 1C07E8F1B478EA90 | B478EA90 |
| tag-v13-99fb7e91 | 1C07E8F199FB7E91 | 99FB7E91 |
| tag-v14-0d44f9b7 | 1C07E8F10D44F9B7 | 0D44F9B7 |
| tag-v15-81ea3e4e | 1C07E8F181EA3E4E | 81EA3E4E |
| tag-v16-a936daeb | 1C07E8F1A936DAEB | A936DAEB |
| tag-v17-f2b3e562 | 1C07E8F1F2B3E562 | F2B3E562 |
| tag-v18-86e98131 | 1C07E8F186E98131 | 86E98131 |
| tag-v19-6a2b0c75 | 1C07E8F16A2B0C75 | 6A2B0C75 |
| tag-v110-6fd2c9b5 | 1C07E8F16FD2C9B5 | 6FD2C9B5 |
| tag-v111-f5313551 | 1C07E8F1F5313551 | F5313551 |
| tag-v112-186e1039 | 1C07E8F1186E1039 | 186E1039 |
| tag-v113-4d6090b7 | 1C07E8F14D6090B7 | 4D6090B7 |
| tag-v114-61b18bc2 | 1C07E8F161B18BC2 | 61B18BC2 |
| tag-v115-8ea87b66 | 1C07E8F18EA87B66 | 8EA87B66 |
| tag-v116-bd73118e | 1C07E8F1BD73118E | BD73118E |
| tag-v117-b07b6016 | 1C07E8F1B07B6016 | B07B6016 |
| tag-v118-a7452b4c | 1C07E8F1A7452B4C | A7452B4C |
| tag-v119-53f7f079 | 1C07E8F153F7F079 | 53F7F079 |
| tag-v120-2bae92c4 | 1C07E8F12BAE92C4 | 2BAE92C4 |

**GEPOG Tags (4 devices):**
| Tag ID | DeviceEUI | Unique ID |
|--------|-----------|----------|
| tag-v121-81f14ea7 | 1C07E8F181F14EA7 | 81F14EA7 |
| tag-v122-b562fafe | 1C07E8F1B562FAFE | B562FAFE |
| tag-v123-4dd75224 | 1C07E8F14DD75224 | 4DD75224 |
| tag-v124-c53239d9 | 1C07E8F1C53239D9 | C53239D9 |

### Data Integration and Visualization

The network integrates with several data platforms for visualization and analysis:

**The Things Network (TTN):**
- Primary LoRaWAN network server
- Device management and provisioning
- Webhook integration for data forwarding
- API keys for programmatic access

**Datacake Platform:**
- Real-time dashboard visualization
- Device location mapping
- Alert and notification system
- TTN integration via API key: NNSXS.CROOPVRPJLN43SVJFHP7YYBJZDLCVAUXYKYZMUA

**Traccar Tracking:**
- GPS tracking platform integration
- Historical movement analysis
- Account: gfo@arribada.org
- API Token: eyJkYXRhIjo0MDQ0OX0uTmRJU1FUNFRSQmFoZytOZ09Fdi81OGtnMFM5UWh3QVB5a3ZDbXZOME1VOA

**WisDM Management:**
- RAKwireless gateway management platform
- Remote configuration and monitoring
- Performance analytics and diagnostics
- Account: geoffrey@arribada.org

### Installation Documentation

The deployment follows standardized procedures documented in the French installation checklist, which covers:

**Pre-Installation Requirements:**
- Gateway model verification (RAK7289V2 for specific sites)
- Battery system (RAK9155) and solar panel kit preparation
- Tool requirements: UV-resistant cable ties, multimeter, safety equipment
- Site assessment for pole diameter and cellular coverage

**Installation Steps:**
1. Mount gateway support bracket (M6 screws)
2. Position clamps around pole (50-100mm diameter supported)
3. Install battery system with proper cable connections
4. Mount solar panel with 5-10° south inclination
5. Connect antenna vertically (LoRa 1 port)
6. Configure cellular APN and network settings
7. Test LED indicators for system status

**System Status Indicators:**
- LED1: Power (should be on)
- LED3: LoRa1 (should activate/blink after startup)
- LED5: Cellular connection status
  - Slow blink (1800ms on/200ms off): Network search
  - Rapid blink (125ms on/off): Data transfer
  - Inverted slow blink: Standby mode

**Environmental Considerations:**
- IP67 waterproof rating for tropical conditions
- Salt spray resistance for marine environments
- Temperature range: 5°C to 55°C
- Hurricane wind resistance up to 200+ km/h

### Network Administration

The French Guiana network is managed through multiple platforms:

**WisDM Platform:**
- Gateway management interface at arribada.wisdm.rakwireless.com
- Remote configuration and monitoring capabilities
- Performance analytics and diagnostic tools
- Account: geoffrey@arribada.org

**The Things Network Console:**
- Device provisioning and management
- Network traffic monitoring
- API key generation for integrations
- Gateway registration with unique EUIs

**Field Support:**
- Contact: Geoffrey (geoffrey@arribada.org, +262 6 93 30 96 01)
- Remote validation of installation and operation
- Technical support for configuration issues
- Performance monitoring and optimisation

This operational network demonstrates Arribada's capability to deploy and maintain LoRaWAN infrastructure for conservation research in challenging environments, providing a foundation for similar deployments worldwide.

---

*The French Guiana LoRaWAN network represents a successful deployment of distributed data collection infrastructure for sea turtle conservation research, demonstrating the practical application of modern IoT technology in challenging tropical marine environments.*