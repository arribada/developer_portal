---
title: Penguin Cam Setup Guide
sidebar_position: 5
---

# Penguin Cam Setup Guide

A comprehensive guide for setting up an automated penguin monitoring camera system using the Adafruit ESP32 Feather V2 Huzzah32 and Raspberry Pi Zero W. This system captures timestamped photos automatically and stores them on a USB drive.

## System Overview

The Penguin Cam system consists of:

- **ESP32 Feather V2**: Timer-controlled power management with DS3231 RTC
- **Raspberry Pi Zero W**: Camera control and image capture
- **USB Camera**: Image capture device
- **USB Storage**: Image storage
- **Relay Module**: Power switching for camera system

## Hardware Requirements

### Core Components
- Adafruit ESP32 Feather V2 Huzzah32
- Raspberry Pi Zero W
- DS3231 Real-Time Clock module
- Relay module (GPIO-controlled)
- USB camera (gPhoto2 compatible)
- USB storage device
- USB-C cable (for ESP32 programming)
- MicroUSB cable (for Pi power)

### Tools Required
- Computer with USB ports
- Internet connection
- Terminal/Command prompt access

## Part 1: ESP32 Setup

### Prerequisites

Before starting, ensure you have:
- **Hardware**: Adafruit ESP32 Feather V2 Huzzah32, USB-C cable
- **Software**: Python 3 and pip installed, Thonny IDE

### Step 1: Install esptool

Open a terminal or command prompt and install the ESP32 flashing tool:

```bash
pip install esptool
```

If you encounter permission errors on Windows, run the command prompt as Administrator.

### Step 2: Download MicroPython Firmware

1. Visit the official ESP32 firmware page: https://micropython.org/download/ESP32_GENERIC/
2. Under **ESP32 / WROOM**, download the latest stable `.bin` file
3. Note the exact filename (e.g., `esp32spiram-20231005-v1.21.0.bin`)

### Step 3: Connect and Identify Your ESP32

1. Connect your ESP32 Feather V2 to your computer using the USB-C cable
2. Identify your device port:

**Windows:**
- Open Device Manager
- Look under "Ports (COM & LPT)" for a new COM port (e.g., COM3, COM4)

**Mac/Linux:**
- Open Terminal and run: `ls /dev/tty.*`
- Look for a device like `/dev/tty.usbserial-xxxx` or `/dev/ttyUSB0`

### Step 4: Erase Existing Flash

Before flashing new firmware, clear the ESP32's flash memory:

**Windows:**
```bash
esptool.py --chip esp32 --baud 115200 --port COM3 erase_flash
```

**Mac/Linux:**
```bash
esptool.py --chip esp32 --baud 115200 --port /dev/tty.usbserial-xxxx erase_flash
```

Replace the port with your actual device port.

### Step 5: Flash MicroPython Firmware

Flash the MicroPython firmware to your ESP32:

**Windows:**
```bash
esptool.py --chip esp32 --baud 115200 --port COM3 write_flash -z 0x1000 esp32spiram-20231005-v1.21.0.bin
```

**Mac/Linux:**
```bash
esptool.py --chip esp32 --baud 115200 --port /dev/tty.usbserial-xxxx write_flash -z 0x1000 esp32spiram-20231005-v1.21.0.bin
```

Replace with your actual port and firmware filename.

### Step 6: Set Up Thonny IDE

1. Download and install [Thonny IDE](https://thonny.org/)
2. Open Thonny
3. Go to **Tools → Options → Interpreter**
4. Select **MicroPython (ESP32)**
5. Choose your ESP32's port from the dropdown
6. Click **OK**

You should see the MicroPython prompt (`>>>`) appear in the Thonny console.

## Part 2: Upload Code to ESP32

### Step 7: Create the DS3231 Driver

Create a new file in Thonny and paste the following DS3231 driver code:

```python
# ds3231.py
import time
import machine

_ADDR = const(104)

EVERY_SECOND = 0x0F  # Exported flags
EVERY_MINUTE = 0x0E
EVERY_HOUR = 0x0C
EVERY_DAY = 0x80
EVERY_WEEK = 0x40
EVERY_MONTH = 0

try:
    rtc = machine.RTC()
except:
    print("Warning: machine module does not support the RTC.")
    rtc = None

class Alarm:
    def __init__(self, device, n):
        self._device = device
        self._i2c = device.ds3231
        self.alno = n  # Alarm no.
        self.offs = 7 if self.alno == 1 else 0x0B  # Offset into address map
        self.mask = 0

    def _reg(self, offs : int, buf = bytearray(1)) -> int:  # Read a register
        self._i2c.readfrom_mem_into(_ADDR, offs, buf)
        return buf[0]

    def enable(self, run):
        flags = self._reg(0x0E) | 4  # Disable square wave
        flags = (flags | self.alno) if run else (flags & ~self.alno & 0xFF)
        self._i2c.writeto_mem(_ADDR, 0x0E, flags.to_bytes(1, "little"))

    def __call__(self):  # Return True if alarm is set
        return bool(self._reg(0x0F) & self.alno)

    def clear(self):
        flags = (self._reg(0x0F) & ~self.alno) & 0xFF
        self._i2c.writeto_mem(_ADDR, 0x0F, flags.to_bytes(1, "little"))

    def set(self, when, day=0, hr=0, min=0, sec=0):
        if when not in (0x0F, 0x0E, 0x0C, 0x80, 0x40, 0):
            raise ValueError("Invalid alarm specifier.")
        self.mask = when
        if when == EVERY_WEEK:
            day += 1  # Setting a day of week
        self._device.set_time((0, 0, day, hr, min, sec, 0, 0), self)
        self.enable(True)

class DS3231:
    def __init__(self, i2c):
        self.ds3231 = i2c
        self.alarm1 = Alarm(self, 1)
        self.alarm2 = Alarm(self, 2)
        if _ADDR not in self.ds3231.scan():
            raise RuntimeError(f"DS3231 not found on I2C bus at {_ADDR}")

    def get_time(self, data=bytearray(7)):
        def bcd2dec(bcd):  # Strip MSB
            return ((bcd & 0x70) >> 4) * 10 + (bcd & 0x0F)

        self.ds3231.readfrom_mem_into(_ADDR, 0, data)
        ss, mm, hh, wday, DD, MM, YY = [bcd2dec(x) for x in data]
        YY += 2000
        # Time from DS3231 in time.localtime() format (less yday)
        result = YY, MM, DD, hh, mm, ss, wday - 1, 0
        return result

    def set_time(self, tt=None, alarm=None):
        def gbyte(dec, mod=0):
            tens, units = divmod(dec, 10)
            n = (tens << 4) + units
            n |= 0x80 if mod & 0x0F else mod & 0xC0
            return n.to_bytes(1, "little")

        YY, MM, mday, hh, mm, ss, wday, yday = time.localtime() if tt is None else tt
        mask = 0 if alarm is None else alarm.mask
        offs = 0 if alarm is None else alarm.offs
        if alarm is None or alarm.alno == 1:  # Has a seconds register
            self.ds3231.writeto_mem(_ADDR, offs, gbyte(ss, mask & 1))
            offs += 1
        self.ds3231.writeto_mem(_ADDR, offs, gbyte(mm, mask & 2))
        offs += 1
        self.ds3231.writeto_mem(_ADDR, offs, gbyte(hh, mask & 4))  # Sets to 24hr mode
        offs += 1
        if alarm is not None:  # Setting an alarm - mask holds MS 2 bits
            self.ds3231.writeto_mem(_ADDR, offs, gbyte(mday, mask))
        else:  # Setting time
            self.ds3231.writeto_mem(_ADDR, offs, gbyte(wday + 1))  # 1 == Monday, 7 == Sunday
            offs += 1
            self.ds3231.writeto_mem(_ADDR, offs, gbyte(mday))  # Day of month
            offs += 1
            self.ds3231.writeto_mem(_ADDR, offs, gbyte(MM, 0x80))  # Century bit (>Y2K)
            offs += 1
            self.ds3231.writeto_mem(_ADDR, offs, gbyte(YY - 2000))

    def temperature(self):
        def twos_complement(input_value: int, num_bits: int) -> int:
            mask = 2 ** (num_bits - 1)
            return -(input_value & mask) + (input_value & ~mask)

        t = self.ds3231.readfrom_mem(_ADDR, 0x11, 2)
        i = t[0] << 8 | t[1]
        return twos_complement(i >> 6, 10) * 0.25

    def __str__(self, buf=bytearray(0x13)):  # Debug dump of device registers
        self.ds3231.readfrom_mem_into(_ADDR, 0, buf)
        s = ""
        for n, v in enumerate(buf):
            s = f"{s}0x{n:02x} 0x{v:02x} {v >> 4:04b} {v & 0xF :04b}\n"
            if not (n + 1) % 4:
                s = f"{s}\n"
        return s
```

Save this file as `ds3231.py` to the ESP32 device:
1. **File → Save As → MicroPython device**
2. Name it `ds3231.py`

### Step 8: Create the Main Application

Create another new file with the ESP32 scheduler code. There are two versions available:

#### Version 1: Standard Sleep Mode

This version uses regular sleep mode and is simpler to debug:

```python
# main.py — Penguin Cam scheduler for Adafruit ESP32 Feather V2

from machine import Pin, I2C
import time
import ds3231

# ── USER CONFIG ───────────────────────────────────────────────
SHOT_INTERVAL_MIN = 10     # minutes between shots
HANDSHAKE_TIMEOUT  = 60  # seconds to wait for Pi signal

# ── HARDWARE SETUP ────────────────────────────────────────────
# I²C to DS3231: SDA=GPIO22, SCL=GPIO20
i2c       = I2C(0, scl=Pin(20), sda=Pin(22))
rtc       = ds3231.DS3231(i2c)

# PowerBoost EN: GPIO4 (pad "A5"), push-pull
boost_en  = Pin(4, Pin.OUT)
boost_en.off()  # EN=0 → booster off → Pi off at startup

# Handshake inputs from Pi:
#  • "Success" → Feather D27 (GPIO27)
#  • "Failure" → Feather D33 (GPIO33)
success_in = Pin(27, Pin.IN, Pin.PULL_DOWN)
failure_in = Pin(33, Pin.IN, Pin.PULL_DOWN)

# ── HELPERS ────────────────────────────────────────────────────
def seconds_until_next_shot():
    """
    Compute seconds until the next multiple of SHOT_INTERVAL_MIN.
    """
    Y, M, D, hh, mm, ss, wday, yday = rtc.get_time()
    now_secs   = hh*3600 + mm*60 + ss
    interval_s = SHOT_INTERVAL_MIN * 60
    next_secs  = ((now_secs // interval_s) + 1) * interval_s
    return next_secs - now_secs

def fire_pi_and_wait():
    """
    1) Turn EN high → PowerBoost on → Pi boots
    2) Wait up to HANDSHAKE_TIMEOUT for Pi to raise success or failure
    3) Turn EN low → PowerBoost off → Pi shuts down
    """
    # 1) Power on the Pi
    boost_en.on()

    # 2) Poll for handshake
    start   = time.ticks_ms()
    timeout = HANDSHAKE_TIMEOUT * 1000
    result  = None

    while time.ticks_diff(time.ticks_ms(), start) < timeout:
        if success_in.value():
            result = "SUCCESS"
            break
        if failure_in.value():
            result = "FAILURE"
            break
        time.sleep_ms(50)

    # 3) Power off the Pi
    boost_en.off()
    print("Shot result:", result or "TIMEOUT")

# ── MAIN LOOP ──────────────────────────────────────────────────
print("Penguin Cam scheduler starting—10-minute interval.")
while True:
    delay = seconds_until_next_shot()
    print(f"Sleeping for {delay} seconds until next shot…")
    time.sleep(delay)

    print("Waking up—powering Pi now.")
    fire_pi_and_wait()
```

#### Version 2: Deep Sleep Mode (Lower Power)

This version uses deep sleep for maximum power efficiency:

```python
# main.py — Penguin Cam scheduler w/ deep sleep on ESP32 Feather V2

from machine import Pin, I2C, deepsleep
import time
import ds3231

# ── CONFIG ───────────────────────────────
SHOT_INTERVAL_MIN = 10     # minutes between shots
HANDSHAKE_TIMEOUT  = 60    # seconds to wait for Pi

# ── HARDWARE SETUP ───────────────────────
i2c       = I2C(0, scl=Pin(20), sda=Pin(22))
rtc       = ds3231.DS3231(i2c)
boost_en  = Pin(4, Pin.OUT)
relay_in  = Pin(14, Pin.OUT)
success_in = Pin(27, Pin.IN, Pin.PULL_DOWN)
failure_in = Pin(33, Pin.IN, Pin.PULL_DOWN)

# Ensure Pi off until shot
boost_en.off()
relay_in.off()

def seconds_until_next_shot():
    Y,M,D,hh,mm,ss,_,_ = rtc.get_time()
    now     = hh*3600 + mm*60 + ss
    interval = SHOT_INTERVAL_MIN * 60
    next_sec = ((now // interval) + 1) * interval
    return next_sec - now

def fire_pi_and_wait():
    boost_en.on()          
    time.sleep_ms(100)
    relay_in.on()          

    start = time.ticks_ms()
    timeout = HANDSHAKE_TIMEOUT * 1000
    result = None
    while time.ticks_diff(time.ticks_ms(), start) < timeout:
        if success_in.value(): result="SUCCESS"; break
        if failure_in.value(): result="FAILURE"; break
        time.sleep_ms(50)

    relay_in.off()       
    boost_en.off()        
    print("Shot result:", result or "TIMEOUT")

# ── MAIN ─────────────────────────────────
print("Penguin Cam scheduler starting…")
# 1) Fire the Pi and camera for this shot
fire_pi_and_wait()

# 2) Compute deep sleep duration and enter
delay = seconds_until_next_shot()
print(f"Sleeping for {delay} s (deep sleep)…")
deepsleep(delay * 1000)   # resets on wake
```

Save either version as `main.py` to the ESP32 device:
1. **File → Save As → MicroPython device**
2. Name it `main.py`

## Part 3: Raspberry Pi Zero W Setup

### Step 9: Prepare the Raspberry Pi

1. Flash Raspberry Pi OS Lite to an SD card
2. Enable SSH by creating an empty file named `ssh` in the boot partition
3. Configure WiFi by creating `wpa_supplicant.conf` in the boot partition:

```
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YourWiFiNetwork"
    psk="YourWiFiPassword"
}
```

4. Insert SD card and power on the Pi
5. SSH into the Pi: `ssh pi@raspberrypi.local` (default password: `raspberry`)

### Step 10: Install Required Software

Update the system and install gPhoto2:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y gphoto2 python3-pip python3-rpi.gpio
```

### Step 11: Configure USB Drive Mounting

#### Find Your USB Drive UUID

Insert your USB drive and run:

```bash
sudo blkid
```

Look for your USB drive (usually `/dev/sda1`) and note its UUID.

#### Set Up Automatic Mounting

Add the following line to `/etc/fstab` (replace UUID with your actual UUID):

```bash
echo "UUID=YOUR-USB-UUID  /mnt/usb  vfat  defaults,noatime,nofail,uid=1000,gid=1000,umask=0022  0  0" | sudo tee -a /etc/fstab
```

Create the mount point and test:

```bash
sudo mkdir -p /mnt/usb
sudo systemctl daemon-reload
sudo mount -a
```

### Step 12: Create the Camera Control Script

Create the main camera control script:

```bash
sudo nano /usr/local/bin/capture_with_relay.py
```

Add the following content:

```python
#!/usr/bin/env python3
"""
capture_with_relay.py

1. Drive GPIO14 high to power camera via relay.
2. Wait for camera + USB to enumerate.
3. Mount USB drive (already auto-mounted via /etc/fstab at /mnt/usb).
4. Capture image with gphoto2.
5. Send success/failure signal to ESP32.
6. Drive GPIO14 low to cut camera power.
"""

import os
import time
import subprocess
import logging
import RPi.GPIO as GPIO

# ── Configuration ──────────────────────────────────────────────
RELAY_PIN       = 14                # BCM numbering for GPIO14
MOUNT_POINT     = "/mnt/usb"        # auto-mounted via fstab
FILENAME_FMT    = "penguin_%Y%m%d_%H%M%S.jpg"
LOG_FILE        = "/var/log/capture_relay.log"
GPIO_POWER_HIGH = GPIO.HIGH
GPIO_POWER_LOW  = GPIO.LOW

# Handshake outputs to ESP32
SUCCESS_PIN     = 27                # Signal capture success
FAILURE_PIN     = 33                # Signal capture failure

# ── Setup logging ──────────────────────────────────────────────
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger()

def run_cmd(cmd):
    """Run a shell command, logging stdout/stderr."""
    logger.info(f"↪ Running: {cmd}")
    try:
        out = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT)
        logger.info(out.decode().strip())
        return True
    except subprocess.CalledProcessError as e:
        logger.error(e.output.decode().strip())
        return False

def capture_image():
    """Invoke gphoto2 to capture image and save to USB."""
    ts   = time.strftime(FILENAME_FMT)
    dest = os.path.join(MOUNT_POINT, ts)
    cmd  = f"gphoto2 --capture-image-and-download --filename '{dest}' --quiet"
    return run_cmd(cmd)

def main():
    logger.info("=== Starting Penguin Cam capture sequence ===")
    
    # 1) Setup GPIO pins
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(RELAY_PIN, GPIO.OUT)
    GPIO.setup(SUCCESS_PIN, GPIO.OUT)
    GPIO.setup(FAILURE_PIN, GPIO.OUT)
    
    # Initialize handshake pins to low
    GPIO.output(SUCCESS_PIN, GPIO.LOW)
    GPIO.output(FAILURE_PIN, GPIO.LOW)
    
    # 2) Power camera on via relay
    GPIO.output(RELAY_PIN, GPIO_POWER_HIGH)
    logger.info("Relay ON – camera powered")

    # 3) Give camera time to enumerate and stabilize
    time.sleep(5)
    logger.info("Initialization delay complete – camera should be ready")

    capture_success = False
    
    # 4) Verify USB mount is available
    if not os.path.ismount(MOUNT_POINT):
        logger.error(f"USB drive not mounted at {MOUNT_POINT}")
    else:
        # 5) Capture & download image
        if capture_image():
            logger.info("Image capture successful")
            capture_success = True
        else:
            logger.error("Image capture failed")

    # 6) Send handshake signal to ESP32
    if capture_success:
        GPIO.output(SUCCESS_PIN, GPIO.HIGH)
        logger.info("Sent SUCCESS signal to ESP32")
    else:
        GPIO.output(FAILURE_PIN, GPIO.HIGH)
        logger.info("Sent FAILURE signal to ESP32")
    
    # Hold signal for ESP32 to detect
    time.sleep(2)

    # 7) Power camera off and cleanup
    GPIO.output(RELAY_PIN, GPIO_POWER_LOW)
    logger.info("Relay OFF – camera powered down")

    GPIO.cleanup()
    logger.info("=== Penguin Cam capture sequence complete ===")

if __name__ == "__main__":
    main()
```

Make the script executable:

```bash
sudo chmod +x /usr/local/bin/capture_with_relay.py
```

### Step 13: Set Up Automatic Capture Service

Create a systemd service to run the capture script on boot:

```bash
sudo nano /etc/systemd/system/penguin-cam.service
```

Add the following content:

```ini
[Unit]
Description=Penguin Cam – automated photo capture via relay control
After=local-fs.target network.target
Wants=local-fs.target

[Service]
Type=oneshot
ExecStartPre=/bin/sleep 10
ExecStartPre=/bin/mount -a
ExecStart=/usr/bin/python3 /usr/local/bin/capture_with_relay.py
RemainAfterExit=no
User=pi
Group=pi

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable penguin-cam.service
```

## Testing and Troubleshooting

### Test the Camera Setup

1. **Test gPhoto2 manually**:
   ```bash
   gphoto2 --auto-detect
   gphoto2 --capture-image-and-download --filename test.jpg
   ```

2. **Test the relay control**:
   ```bash
   sudo python3 /usr/local/bin/capture_with_relay.py
   ```

3. **Check the logs**:
   ```bash
   tail -f /var/log/capture_relay.log
   ```

### Common Issues

#### ESP32 Not Detected
- **Windows**: Install CP210x USB driver from Silicon Labs
- **Mac**: Install CP210x VCP driver
- Try a different USB-C cable
- Check Device Manager (Windows) or System Information (Mac)

#### gPhoto2 Camera Not Found
- Verify camera is gPhoto2 compatible: `gphoto2 --list-cameras`
- Check USB connections
- Try different USB ports
- Some cameras need to be in specific modes (not auto mode)

#### USB Drive Not Mounting
- Check USB drive format (FAT32 recommended)
- Verify UUID in `/etc/fstab`
- Check for filesystem errors: `sudo fsck /dev/sda1`

#### Permission Issues
- Ensure script is executable: `sudo chmod +x /usr/local/bin/capture_with_relay.py`
- Check log file permissions: `sudo touch /var/log/capture_relay.log && sudo chown pi:pi /var/log/capture_relay.log`

### System Monitoring

Monitor your penguin cam system:

```bash
# Check service status
sudo systemctl status penguin-cam.service

# View recent logs
journalctl -u penguin-cam.service -f

# Check capture logs
tail -f /var/log/capture_relay.log

# Test manual capture
sudo python3 /usr/local/bin/capture_with_relay.py
```

## Customization

### Adjusting Capture Timing

The current setup captures one image per boot cycle. To modify timing:

1. **For ESP32 timer control**: Modify the alarm settings in your main.py
2. **For Pi-based timing**: Add cron jobs or modify the systemd service timer

### Image Quality Settings

Modify the gPhoto2 command in `capture_with_relay.py` to adjust quality:

```python
cmd = f"gphoto2 --set-config quality=1 --capture-image-and-download --filename '{dest}' --quiet"
```

### Power Management

Adjust power timing in the script:
- Increase camera startup delay for slower cameras
- Add power-down delays if needed
- Implement battery monitoring for solar setups

## Hardware Connections

### ESP32 to DS3231 RTC
- VCC → 3.3V
- GND → GND  
- SDA → GPIO 22 (SDA)
- SCL → GPIO 20 (SCL)

### ESP32 Power Control
- PowerBoost EN → GPIO 4 (controls Pi power)

### ESP32 to Pi Handshake Signals
- ESP32 GPIO 27 ← Pi GPIO 27 (SUCCESS signal)
- ESP32 GPIO 33 ← Pi GPIO 33 (FAILURE signal)
- Common GND connection between ESP32 and Pi

### Pi to Relay Module (Camera Power)
- VCC → 5V
- GND → GND
- Signal → Pi GPIO 14

### Camera and USB Storage
Connect via USB hub to Pi if multiple USB devices needed.

### Power Supply
- ESP32: USB-C or battery connected to PowerBoost
- Pi: Powered by ESP32 via PowerBoost EN pin
- Camera: Powered via relay controlled by Pi GPIO 14

---

This setup provides a robust, timer-controlled penguin monitoring camera system. The ESP32 manages power timing while the Pi handles image capture and storage, making it ideal for remote wildlife monitoring applications.