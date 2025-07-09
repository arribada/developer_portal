---
title: Testing Guidelines
sidebar_position: 5
---

# Testing Guidelines

Quality assurance is critical for conservation technology that operates in remote, harsh environments. This guide covers our testing philosophy, strategies, and tools.

## Testing Philosophy

### Why We Test
- **Reliability**: Wildlife depends on our technology working correctly
- **Confidence**: Researchers trust devices that have been thoroughly tested
- **Efficiency**: Catch issues early, fix them cheaply
- **Documentation**: Tests document expected behaviour

### Test-Driven Development (TDD)
We follow TDD practices as our primary development methodology:
1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests green

This ensures:
- Every feature has tests before implementation
- We only write code that's needed
- Refactoring is safe with comprehensive test coverage
- Requirements are clearly defined through tests

### Testing Pyramid
```
         /\
        /  \  E2E Tests (10%)
       /----\
      /      \  Integration Tests (30%)
     /--------\
    /          \  Unit Tests (60%)
   /____________\
```

## Types of Testing

### Unit Testing

#### Firmware (Zephyr)
```c
#include <zephyr/ztest.h>
#include "sensor_driver.h"

static void test_sensor_init(void)
{
    int ret;
    struct sensor_config config = {
        .sampling_rate = 10,
        .precision = SENSOR_PRECISION_HIGH
    };
    
    ret = sensor_init(&config);
    zassert_equal(ret, 0, "Sensor init failed: %d", ret);
    
    // Verify sensor state
    zassert_equal(sensor_get_state(), SENSOR_STATE_READY,
                  "Sensor not in ready state");
}

static void test_sensor_read_timeout(void)
{
    int ret;
    struct sensor_data data;
    
    // Simulate sensor timeout
    sensor_simulate_timeout(true);
    
    ret = sensor_read(&data, K_MSEC(100));
    zassert_equal(ret, -ETIMEDOUT, 
                  "Expected timeout error, got: %d", ret);
}

ZTEST_SUITE(sensor_driver, NULL, NULL, NULL, NULL, NULL);
ZTEST(sensor_driver, test_init) { test_sensor_init(); }
ZTEST(sensor_driver, test_timeout) { test_sensor_read_timeout(); }
```

#### Python
```python
import pytest
from arribada.telemetry import TelemetryProcessor

class TestTelemetryProcessor:
    @pytest.fixture
    def processor(self):
        return TelemetryProcessor(buffer_size=100)
    
    def test_process_valid_data(self, processor):
        data = {
            'timestamp': 1234567890,
            'lat': -31.9505,
            'lon': 115.8605,
            'altitude': 42.5
        }
        
        result = processor.process(data)
        assert result.is_valid
        assert result.coordinates == (-31.9505, 115.8605)
    
    def test_process_invalid_coordinates(self, processor):
        data = {
            'timestamp': 1234567890,
            'lat': 91.0,  # Invalid latitude
            'lon': 115.8605
        }
        
        with pytest.raises(ValueError, match="Invalid latitude"):
            processor.process(data)
    
    @pytest.mark.parametrize("lat,lon,expected", [
        (0, 0, True),          # Equator
        (-90, 180, True),      # South pole
        (90, -180, True),      # North pole
        (-31.9505, 115.8605, True),  # Perth
    ])
    def test_coordinate_validation(self, processor, lat, lon, expected):
        assert processor.validate_coordinates(lat, lon) == expected
```
### Integration Testing

#### Hardware-in-the-Loop (HIL)
```python
import pytest
from arribada.testing import HardwareTestBench

class TestHorizonIntegration:
    @pytest.fixture
    def test_bench(self):
        bench = HardwareTestBench("horizon_v4")
        bench.connect()
        yield bench
        bench.disconnect()
    
    def test_satellite_communication(self, test_bench):
        # Configure device
        test_bench.configure({
            'mode': 'satellite',
            'message_interval': 3600,
            'retry_count': 3
        })
        
        # Send test message
        message_id = test_bench.send_message("TEST_PAYLOAD_123")
        
        # Wait for satellite ACK (with timeout)
        ack = test_bench.wait_for_ack(message_id, timeout=300)
        
        assert ack.received
        assert ack.rssi > -120  # Signal strength check
        assert ack.latency < 60  # Seconds
    
    def test_power_consumption(self, test_bench):
        # Measure baseline
        baseline = test_bench.measure_power()
        
        # Trigger GPS acquisition
        test_bench.trigger_gps()
        gps_power = test_bench.measure_power()
        
        # Verify power budget
        assert gps_power.average < 150  # mA
        assert gps_power.peak < 200     # mA
```

### End-to-End Testing

#### Field Testing Protocol
```yaml
# field_test_protocol.yaml
test_name: "Sea Turtle Tag Deployment Test"
duration: 72_hours
environment:
  location: "Coral Bay Marine Reserve"
  conditions:
    - salt_water_immersion
    - depth: 0-50m
    - temperature: 15-30°C
    
metrics:
  - gps_acquisition_time
  - satellite_success_rate
  - battery_voltage
  - water_ingress
  - data_integrity

success_criteria:
  gps_fix_rate: ">90%"
  satellite_delivery: ">95%"
  battery_life: ">70 hours"
  waterproof: "IP68 verified"
```

## Testing Infrastructure

### Continuous Integration
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  firmware-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Zephyr SDK
        run: |
          wget https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v0.16.3/zephyr-sdk-0.16.3_linux-x86_64_minimal.tar.xz
          tar xf zephyr-sdk-0.16.3_linux-x86_64_minimal.tar.xz
          ./zephyr-sdk-0.16.3/setup.sh -t arm-zephyr-eabi
      
      - name: Run Unit Tests
        run: |
          west build -b native_posix -t test
          
      - name: Coverage Report
        run: |
          lcov --capture --directory build/ --output-file coverage.info
          genhtml coverage.info --output-directory coverage-html
          
  hardware-tests:
    runs-on: [self-hosted, hardware-lab]
    steps:
      - uses: actions/checkout@v3
      - name: Flash Test Firmware
        run: |
          west flash --board horizon_v4
          
      - name: Run HIL Tests
        run: |
          pytest tests/hardware/ -v --junit-xml=results.xml
```

### Test Equipment

#### Essential Tools
1. **Power Analysis**
   - Oscilloscope (100MHz minimum)
   - Current probe (µA resolution)
   - Power profiler (Nordic PPK2)

2. **Environmental Testing**
   - Temperature chamber (-40°C to +85°C)
   - Salt spray chamber
   - Pressure vessel (to 100m depth)
   - Vibration table

3. **RF Testing**
   - Spectrum analyser
   - Signal generator
   - Anechoic chamber access
   - GPS simulator

4. **Debug Tools**
   - J-Link debugger
   - Logic analyser
   - Serial console
   - JTAG boundary scan

## Performance Testing

### Benchmarking
```c
// Firmware performance test
#include <zephyr/timing/timing.h>

void benchmark_sensor_read(void)
{
    timing_t start, end;
    uint64_t cycles;
    
    start = timing_counter_get();
    
    // Operation to benchmark
    sensor_read_all();
    
    end = timing_counter_get();
    cycles = timing_cycles_get(&start, &end);
    
    uint64_t ns = timing_cycles_to_ns(cycles);
    LOG_INF("Sensor read took %llu ns", ns);
    
    zassert_true(ns < 1000000, "Sensor read too slow: %llu ns", ns);
}
```

### Load Testing
```python
# Cloud API load test
from locust import HttpUser, task, between

class TelemetryUser(HttpUser):
    wait_time = between(1, 5)
    
    @task
    def post_telemetry(self):
        self.client.post("/api/v1/telemetry", json={
            "device_id": "TEST_001",
            "timestamp": int(time.time()),
            "location": {
                "lat": -31.9505,
                "lon": 115.8605
            },
            "battery": 3.7
        })
    
    @task(3)
    def get_device_status(self):
        self.client.get("/api/v1/devices/TEST_001/status")
```

## Test Data Management

### Test Fixtures
```
tests/
├── fixtures/
│   ├── telemetry/
│   │   ├── valid_gps_track.json
│   │   ├── corrupted_data.bin
│   │   └── edge_cases.yaml
│   ├── hardware/
│   │   ├── sensor_calibration.csv
│   │   └── power_profiles.h5
│   └── integration/
│       └── field_test_results.db
```

### Mock Data Generation
```python
# Generate realistic test data
from arribada.testing import TestDataGenerator

generator = TestDataGenerator()

# Generate GPS track
track = generator.gps_track(
    start_location=(-31.9505, 115.8605),
    duration_hours=24,
    speed_kmh=5,
    noise_level=0.0001
)

# Generate sensor readings
sensors = generator.sensor_data(
    sensors=['temperature', 'pressure', 'humidity'],
    duration_hours=24,
    anomaly_rate=0.01
)
```

## Testing Best Practices

### Do's
- ✅ Write tests before fixing bugs
- ✅ Test edge cases and error conditions
- ✅ Use meaningful test names
- ✅ Keep tests independent
- ✅ Mock external dependencies
- ✅ Measure and monitor coverage

### Don'ts
- ❌ Test implementation details
- ❌ Write brittle tests
- ❌ Ignore flaky tests
- ❌ Skip tests to meet deadlines
- ❌ Test multiple behaviours in one test

## Next Steps

- Set up [CI/CD Pipeline](./ci-cd.md)
- Review [Code Standards](./code-standards.md)
- Understand [Documentation](./documentation.md) requirements
- Start writing tests!
