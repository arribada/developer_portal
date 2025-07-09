---
title: Code Standards
sidebar_position: 3
---

# Code Standards & Style Guide

Consistent code style makes our platform more maintainable and easier for contributors to understand. This guide covers our standards across all languages used at Arribada.

## General Principles

### The Arribada Way
1. **Clarity over cleverness** - Write code that's easy to understand
2. **Explicit over implicit** - Be clear about intentions
3. **Consistent over personal preference** - Follow team standards
4. **Documented assumptions** - Explain the "why" not just the "what"

## Language-Specific Standards

### Embedded C (Zephyr RTOS)

#### Formatting
- Use the Arribada linter (enforced by CI/CD)
- 4 spaces for indentation (no tabs)
- Maximum line length: 100 characters
- K&R style braces

```c
// Good
int process_sensor_data(struct sensor_data *data)
{
    if (data == NULL) {
        LOG_ERR("Null sensor data");
        return -EINVAL;
    }
    
    // Process data
    return 0;
}

// Bad
int process_sensor_data(struct sensor_data *data){
    if(!data) return -1;  // Too compact, unclear error
}
```

#### Naming Conventions
- Functions: `snake_case`
- Constants: `UPPER_SNAKE_CASE`
- Structs: `snake_case` with `_t` suffix for typedefs
- Global variables: `g_` prefix (avoid when possible)

```c
#define MAX_RETRIES 3
#define SENSOR_TIMEOUT_MS 1000

typedef struct {
    uint32_t timestamp;
    float temperature;
    float humidity;
} sensor_reading_t;

static int read_sensor(sensor_reading_t *reading);
```

#### Zephyr-Specific Guidelines
- Always use Zephyr's error codes
- Prefer Zephyr's APIs over standard C library
- Use device tree for hardware configuration
- Implement proper thread safety

```c
// Good - Using Zephyr patterns
#include <zephyr/kernel.h>
#include <zephyr/device.h>
#include <zephyr/drivers/sensor.h>

#define SENSOR_NODE DT_NODELABEL(bme280)

static const struct device *sensor_dev = DEVICE_DT_GET(SENSOR_NODE);

int init_sensor(void)
{
    if (!device_is_ready(sensor_dev)) {
        LOG_ERR("Sensor %s not ready", sensor_dev->name);
        return -ENODEV;
    }
    return 0;
}
```

#### Memory Management
- No dynamic allocation in interrupt contexts
- Prefer static allocation or memory pools
- Always check allocation results
- Use Zephyr's memory management APIs

```c
// Good - Using memory pools
K_MEM_POOL_DEFINE(sensor_pool, 16, 64, 4, 4);

void process_reading(void)
{
    struct k_mem_block block;
    sensor_reading_t *reading;
    
    if (k_mem_pool_alloc(&sensor_pool, &block, 
                         sizeof(sensor_reading_t), K_NO_WAIT) == 0) {
        reading = block.data;
        // Use reading
        k_mem_pool_free(&block);
    }
}
```
### Python

#### Style Guide
- Follow PEP 8 with Black formatter
- Type hints required for public APIs
- Docstrings for all public functions

```python
from typing import Optional, List
import pandas as pd

def process_telemetry_data(
    data: pd.DataFrame,
    threshold: float = 0.95,
    window_size: Optional[int] = None
) -> pd.DataFrame:
    """
    Process telemetry data with outlier detection.
    
    Args:
        data: Raw telemetry DataFrame with columns ['timestamp', 'lat', 'lon', 'value']
        threshold: Confidence threshold for outlier detection (0-1)
        window_size: Rolling window size for smoothing, defaults to auto-detect
        
    Returns:
        Processed DataFrame with outliers removed and smoothed values
        
    Raises:
        ValueError: If data is empty or threshold is out of range
    """
    if data.empty:
        raise ValueError("Input data cannot be empty")
    
    if not 0 <= threshold <= 1:
        raise ValueError(f"Threshold must be between 0 and 1, got {threshold}")
    
    # Implementation here
    return processed_data
```

#### Project Structure
```
python_project/
├── src/
│   └── arribada/
│       ├── __init__.py
│       ├── core/
│       ├── utils/
│       └── api/
├── tests/
│   ├── unit/
│   └── integration/
├── requirements.txt
├── requirements-dev.txt
├── setup.py
└── pyproject.toml
```

### JavaScript/TypeScript

#### Standards
- ESLint + Prettier configuration
- TypeScript for all new code
- React hooks for UI components
- Functional programming preferred

```typescript
// Good - Type-safe with clear interfaces
interface SensorReading {
  id: string;
  timestamp: Date;
  location: {
    lat: number;
    lon: number;
  };
  values: Record<string, number>;
}

export const processSensorData = (
  readings: SensorReading[]
): ProcessedData => {
  return readings
    .filter(reading => isValid(reading))
    .map(reading => ({
      ...reading,
      processed: true,
      processedAt: new Date()
    }));
};

// Bad - No types, unclear structure
export const processData = (data) => {
  return data.filter(d => d.valid).map(d => ({...d, processed: true}));
};
```
## Code Review Standards

### What We Look For

#### Functionality
- ✓ Meets requirements and specifications
- ✓ Handles edge cases appropriately
- ✓ No regressions in existing functionality
- ✓ Performance considerations addressed

#### Code Quality
- ✓ Follows language-specific style guides
- ✓ Clear variable and function names
- ✓ Appropriate abstraction levels
- ✓ DRY (Don't Repeat Yourself) principles

#### Testing
- ✓ Unit tests for new functionality
- ✓ Integration tests where appropriate
- ✓ Test coverage ≥ 80% for critical paths
- ✓ Edge cases tested

#### Documentation
- ✓ Clear commit messages
- ✓ Updated API documentation
- ✓ Inline comments for complex logic
- ✓ README updates if needed

### Review Process

1. **Self-Review First**
   - Run linters and formatters
   - Execute test suite locally
   - Review your own diff

2. **Pull Request Description**
   ```markdown
   ## Description
   Brief description of changes and why they're needed.
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No sensitive data exposed
   ```

3. **Reviewer Guidelines**
   - First pass: Understand the change at high level
   - Second pass: Detailed review of implementation
   - Be constructive and specific in feedback
   - Suggest improvements, not just problems

## Security Standards

### Never Commit
- API keys or secrets
- Passwords or credentials
- Personal information
- Internal IP addresses
- Debug code with security implications

### Always Consider
- Input validation
- SQL injection prevention
- XSS protection
- Authentication/authorisation
- Data encryption needs

## Performance Guidelines

### Embedded Systems
- Minimise memory allocations
- Consider power consumption
- Profile critical paths
- Use appropriate data structures

### Cloud Services
- Implement caching strategies
- Optimise database queries
- Use pagination for large datasets
- Consider API rate limits

## Next Steps

- Set up your [Development Environment](./development-setup.md)
- Learn our [Version Control](./version-control.md) workflow
- Review [Testing Guidelines](./testing.md)
- Start contributing!
