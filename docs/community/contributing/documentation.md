---
title: Documentation Standards
sidebar_position: 8
---

# Documentation Standards

Clear, comprehensive documentation is essential for open-source conservation technology. This guide covers our documentation philosophy, standards, and tools.

## Documentation Philosophy

### Why We Document
- **Knowledge Sharing**: Enable global conservation efforts
- **Sustainability**: Projects outlive their creators
- **Efficiency**: Reduce support burden
- **Community**: Lower barriers to contribution

### Documentation Types
1. **Code Documentation** - Inline comments, docstrings
2. **API Documentation** - Endpoints, parameters, examples
3. **User Guides** - How-to articles, tutorials
4. **Reference Docs** - Technical specifications
5. **Field Guides** - Deployment procedures

## Code Documentation

### Firmware (C/Zephyr)

#### File Headers
```c
/**
 * @file horizon_gps.c
 * @brief GPS driver for Horizon v4 platform
 * 
 * This driver implements power-efficient GPS operation for wildlife tracking,
 * including temperature compensation and assisted GPS support.
 * 
 * @author Your Name <your.email@arribada.org>
 * @date 2024-01-15
 * @version 1.2.0
 * 
 * @copyright Copyright (c) 2024 Arribada Initiative
 * SPDX-License-Identifier: Apache-2.0
 */
```

#### Function Documentation
```c
/**
 * @brief Acquire GPS fix with power optimization
 * 
 * Attempts to acquire GPS fix using temperature-compensated timing and
 * optional A-GPS data. Implements exponential backoff for power saving.
 * 
 * @param[out] fix Location data structure to populate
 * @param[in] timeout_ms Maximum time to wait for fix (0 = default)
 * @param[in] mode GPS acquisition mode (cold/warm/hot start)
 * 
 * @retval 0 Success, fix contains valid data
 * @retval -ETIMEDOUT No fix acquired within timeout
 * @retval -EINVAL Invalid parameters
 * @retval -EIO Hardware communication error
 * 
 * @note This function may sleep for up to timeout_ms
 * @warning Do not call from ISR context
 * 
 * Example:
 * @code
 * struct gps_fix fix;
 * int ret = gps_acquire_fix(&fix, K_SECONDS(30), GPS_MODE_WARM);
 * if (ret == 0) {
 *     LOG_INF("Fix: %.6f, %.6f", fix.latitude, fix.longitude);
 * }
 * @endcode
 */
int gps_acquire_fix(struct gps_fix *fix, k_timeout_t timeout, enum gps_mode mode);
```

#### Inline Comments
```c
/* Power optimization: Use temperature to predict TTFF */
int32_t temp_mdegC = sensor_get_temperature();
if (temp_mdegC < -10000) {  /* Below -10°C */
    /* Cold temperatures increase TTFF by ~20% */
    timeout_ms = (timeout_ms * 120) / 100;
}

/* 
 * IMPORTANT: The GPS module requires 50ms after power-on
 * before accepting commands. This delay is critical.
 */
k_sleep(K_MSEC(50));
```

### Python Documentation

#### Module Documentation
```python
"""
arribada.telemetry.processor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This module provides telemetry data processing for Arribada tracking devices,
including outlier detection, trajectory smoothing, and data validation.

Basic usage:
    >>> from arribada.telemetry import TelemetryProcessor
    >>> processor = TelemetryProcessor()
    >>> cleaned_data = processor.process(raw_telemetry)

For more examples, see the user guide at https://docs.arribada.org/telemetry
"""
```

#### Function Documentation
```python
def calculate_distance(
    point1: Tuple[float, float],
    point2: Tuple[float, float],
    method: str = "haversine"
) -> float:
    """
    Calculate distance between two geographic points.
    
    Uses the Haversine formula by default for calculating great-circle
    distance between two points on Earth's surface.
    
    Args:
        point1: Tuple of (latitude, longitude) in decimal degrees
        point2: Tuple of (latitude, longitude) in decimal degrees
        method: Distance calculation method. Options:
            - "haversine": Great-circle distance (default)
            - "vincenty": More accurate ellipsoidal distance
            - "euclidean": Simple Euclidean distance (fast but inaccurate)
    
    Returns:
        Distance in meters between the two points
        
    Raises:
        ValueError: If coordinates are out of valid range or method unknown
        
    Examples:
        >>> # Calculate distance between two GPS fixes
        >>> perth = (-31.9505, 115.8605)
        >>> sydney = (-33.8688, 151.2093)
        >>> distance = calculate_distance(perth, sydney)
        >>> print(f"Distance: {distance/1000:.1f} km")
        Distance: 3290.3 km
        
    Note:
        The Haversine formula assumes a spherical Earth and may have up to
        0.5% error. Use 'vincenty' method for sub-meter accuracy.
    """
```

### JavaScript/TypeScript

#### TSDoc Comments
```typescript
/**
 * Represents a wildlife tracking device with real-time telemetry
 * 
 * @remarks
 * This class handles WebSocket connections for live tracking data and
 * manages device state synchronization with the backend.
 * 
 * @example
 * ```typescript
 * const device = new TrackingDevice('DEV-001');
 * device.on('location', (data) => {
 *   console.log(`New position: ${data.lat}, ${data.lon}`);
 * });
 * await device.connect();
 * ```
 * 
 * @public
 */
export class TrackingDevice extends EventEmitter {
  /**
   * Create a new tracking device instance
   * 
   * @param deviceId - Unique device identifier
   * @param options - Configuration options
   * @param options.autoReconnect - Automatically reconnect on disconnect
   * @param options.reconnectDelay - Delay between reconnection attempts (ms)
   * 
   * @throws {@link InvalidDeviceIdError}
   * Thrown if the device ID format is invalid
   */
  constructor(
    deviceId: string,
    options: TrackingDeviceOptions = {}
  ) {
    // Implementation
  }
}
```
## API Documentation

### RESTful API

#### OpenAPI Specification
```yaml
openapi: 3.0.0
info:
  title: Arribada Platform API
  version: 1.0.0
  description: |
    API for wildlife tracking devices and telemetry data.
    
    ## Authentication
    All endpoints require Bearer token authentication.
    
    ## Rate Limiting
    - 100 requests per minute for standard endpoints
    - 10 requests per minute for data export endpoints

paths:
  /devices/{deviceId}/telemetry:
    post:
      summary: Upload telemetry data
      description: |
        Submit telemetry data from a tracking device. Data is validated,
        processed, and stored for analysis.
      tags:
        - Telemetry
      parameters:
        - name: deviceId
          in: path
          required: true
          schema:
            type: string
          description: Unique device identifier
          example: "HRZ-2024-001"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TelemetryData'
            examples:
              gpsData:
                summary: GPS location data
                value:
                  timestamp: "2024-01-15T10:30:00Z"
                  location:
                    latitude: -31.9505
                    longitude: 115.8605
                    altitude: 42.5
                    accuracy: 5.0
                  battery: 3.7
                  temperature: 22.5
      responses:
        '201':
          description: Telemetry data accepted
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    description: Telemetry record ID
                  processed:
                    type: boolean
                    description: Whether data passed validation
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
```

#### API Examples
```markdown
## Quick Start

### Authentication
```bash
# Get access token
curl -X POST https://api.arribada.org/auth/token \
  -H "Content-Type: application/json" \
  -d '{"client_id": "YOUR_CLIENT_ID", "client_secret": "YOUR_SECRET"}'

# Use token in requests
export TOKEN="your-access-token"
curl -H "Authorization: Bearer $TOKEN" https://api.arribada.org/devices
```

### Common Operations

#### List Devices
```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.arribada.org/devices?status=active
```

#### Get Device Telemetry
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://api.arribada.org/devices/HRZ-2024-001/telemetry?start=2024-01-01&end=2024-01-31"
```

#### Upload Telemetry
```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @telemetry.json \
  https://api.arribada.org/devices/HRZ-2024-001/telemetry
```
```

## User Documentation

### Tutorial Structure
```markdown
---
title: Getting Started with Sea Turtle Tracking
sidebar_label: Sea Turtle Tracking
description: Deploy and monitor sea turtle tags in marine environments
---

# Getting Started with Sea Turtle Tracking

In this tutorial, you'll learn how to deploy Arribada sea turtle tags
for long-term marine wildlife monitoring.

## What You'll Learn
- Pre-deployment device configuration
- Attachment methods for different species
- Data retrieval and analysis
- Troubleshooting common issues

## Prerequisites
- Arribada sea turtle tag kit
- Marine epoxy (included)
- Android device with Arribada Field app
- Research permits for your study area

## Time Required
- Configuration: 30 minutes
- Attachment: 45 minutes
- Initial testing: 15 minutes

## Step 1: Configure Your Device

First, connect to your tag via Bluetooth...

[Include screenshots and clear instructions]
```

### Field Guide Template
```markdown
# Field Deployment Checklist

## Pre-Deployment
- [ ] Devices charged to 100%
- [ ] Firmware updated to latest version
- [ ] GPS cold start test passed
- [ ] Satellite connectivity verified
- [ ] Waterproofing inspection completed

## Tools Required
- [ ] Torque screwdriver (2.5 Nm)
- [ ] Marine epoxy kit
- [ ] Isopropyl alcohol (99%)
- [ ] Clean microfiber cloths
- [ ] Cable ties (marine grade)

## Environmental Checks
- [ ] Temperature within operating range (-20°C to +60°C)
- [ ] No severe weather forecast for 48 hours
- [ ] Deployment site accessible and safe

## Post-Deployment
- [ ] Device responding to health checks
- [ ] First GPS fix received
- [ ] Data upload confirmed
- [ ] Field notes completed
```

## Documentation Tools

### Docusaurus Setup
```bash
# Initialize new documentation site
npx create-docusaurus@latest docs classic

# Structure
docs/
├── intro.md
├── tutorials/
│   ├── getting-started.md
│   └── first-deployment.md
├── guides/
│   ├── hardware-setup.md
│   └── data-analysis.md
├── reference/
│   ├── api/
│   └── hardware/
└── troubleshooting/
```

### Automated Documentation

#### Code to Docs
```javascript
// Generate API docs from code
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Arribada Platform API',
      version: package.version,
    },
  },
  apis: ['./routes/*.js'], // Files containing annotations
};

const openapiSpecification = swaggerJsdoc(options);
```

#### Firmware Documentation
```python
# scripts/generate_firmware_docs.py
import os
import re
from pathlib import Path

def extract_doxygen_comments(filepath):
    """Extract and format Doxygen comments for documentation."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Extract function documentation
    pattern = r'/\*\*(.*?)\*/\s*(\w+\s+\w+\s*\([^)]*\))'
    matches = re.findall(pattern, content, re.DOTALL)
    
    for doc, signature in matches:
        # Parse and format for Markdown
        yield format_function_doc(doc, signature)
```

## Writing Style Guide

### General Principles
1. **Clear and Concise** - Avoid jargon, explain acronyms
2. **Action-Oriented** - Start with verbs for instructions
3. **Consistent Terminology** - Use the same terms throughout
4. **Visual Aids** - Include diagrams, screenshots, examples

### Voice and Tone
- **Active Voice**: "Configure the device" not "The device should be configured"
- **Direct**: "You must" not "It is recommended that you"
- **Friendly**: Professional but approachable
- **Inclusive**: Avoid assumptions about expertise

### Formatting Standards

#### Headings
```markdown
# Page Title (H1 - One per page)
## Major Sections (H2)
### Subsections (H3)
#### Details (H4 - Avoid if possible)
```

#### Code Blocks
````markdown
```language
// Always specify language for syntax highlighting
const example = "Use meaningful examples";
```
````

#### Alerts and Callouts
```markdown
:::tip
Helpful information that improves the user experience
:::

:::caution
Important information that prevents common mistakes
:::

:::danger
Critical warnings about data loss or safety
:::

:::info
Additional context or background information
:::
```

## Review Process

### Documentation Review Checklist
- [ ] **Accuracy**: Technical details correct
- [ ] **Completeness**: All steps included
- [ ] **Clarity**: Easy to understand
- [ ] **Consistency**: Follows style guide
- [ ] **Examples**: Relevant and tested
- [ ] **Navigation**: Logical flow and links
- [ ] **Accessibility**: Alt text, proper headings

### Version Control for Docs
```bash
# Documentation follows same git flow
git checkout -b docs/add-turtle-guide
# Make changes
git add docs/
git commit -m "docs: add sea turtle deployment guide"
git push origin docs/add-turtle-guide
```

## Metrics and Improvement

### Documentation Metrics
- Page views and time on page
- Search queries without results
- Support ticket topics
- User feedback scores

### Continuous Improvement
1. Monthly review of support tickets
2. Quarterly documentation survey
3. Annual content audit
4. Community contribution tracking

## Next Steps

- Review [Code Standards](./code-standards.md)
- Set up [Development Environment](./development-setup.md)
- Read existing documentation
- Start documenting!
