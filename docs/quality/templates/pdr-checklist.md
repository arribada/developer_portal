---
title: PDR Checklist Template
sidebar_position: 2
---

# Preliminary Design Review (PDR) Checklist

Use this checklist to ensure all items are addressed before and during PDR.

---

## Project Information

**Project Name:** ______________________  
**Review Date:** ______________________  
**Lead Reviewer:** ______________________  
**Project Phase:** Preliminary Design Review

## Pre-Review Preparation

### Documentation Complete
- [ ] System architecture document
- [ ] Hardware design specification (>75% complete)
- [ ] Firmware design document
- [ ] Interface control document
- [ ] Updated requirements traceability matrix
- [ ] Risk register with mitigations
- [ ] Test plan outline
- [ ] Updated project schedule

### Materials Distributed
- [ ] Review package sent (T-7 days)
- [ ] Pre-review questions collected (T-3 days)
- [ ] Agenda distributed
- [ ] Webex/Teams link sent (if remote)

## Hardware Design Review

### Schematic Design
- [ ] **Power Architecture**
  - [ ] Supply voltages defined
  - [ ] Current budgets calculated
  - [ ] Protection circuits included
  - [ ] Efficiency targets achievable
  
- [ ] **Processor/MCU**
  - [ ] Part selection justified
  - [ ] Memory adequate for application
  - [ ] Peripherals meet requirements
  - [ ] Clock architecture defined
  
- [ ] **Communications**
  - [ ] Interface protocols defined
  - [ ] Antenna design considered
  - [ ] RF compliance path clear
  - [ ] Data rates sufficient
  
- [ ] **Sensors**
  - [ ] Accuracy meets requirements
  - [ ] Sampling rates defined
  - [ ] Interface compatibility confirmed
  - [ ] Calibration approach defined
  
- [ ] **Connectors**
  - [ ] Environmental rating adequate
  - [ ] Pinout documented
  - [ ] Mating cycles sufficient
  - [ ] ESD protection included

### PCB Layout Considerations
- [ ] Board size constraints defined
- [ ] Layer stackup proposed
- [ ] Component placement strategy
- [ ] Thermal management approach
- [ ] EMC considerations addressed
- [ ] Test points identified
- [ ] Manufacturing constraints considered

### Mechanical Design
- [ ] Enclosure concept defined
- [ ] Environmental sealing approach (IP rating)
- [ ] Mounting method specified
- [ ] Thermal path analyzed
- [ ] Shock/vibration considered
- [ ] Assembly process outlined

## Firmware Design Review

### Architecture
- [ ] **System Architecture**
  - [ ] RTOS vs bare metal decided
  - [ ] Task/thread model defined
  - [ ] Memory map documented
  - [ ] Boot sequence defined
  
- [ ] **Communications Stack**
  - [ ] Protocol selection complete
  - [ ] Error handling defined
  - [ ] Buffer management approach
  - [ ] Throughput analysis done
  
- [ ] **Power Management**
  - [ ] Sleep modes defined
  - [ ] Wake sources identified
  - [ ] Power consumption estimated
  - [ ] Battery life calculated
  
- [ ] **Data Management**
  - [ ] Storage approach defined
  - [ ] Wear leveling considered
  - [ ] Backup strategy defined
  - [ ] Data formats specified

### Software Interfaces
- [ ] API specifications drafted
- [ ] Command/response protocol defined
- [ ] Configuration approach defined
- [ ] Firmware update mechanism specified
- [ ] Debug interfaces planned

## System Integration

### Interface Verification
- [ ] Hardware/firmware interfaces aligned
- [ ] Communication protocols matched
- [ ] Power sequencing coordinated
- [ ] Timing requirements achievable
- [ ] Resource conflicts resolved

### Performance Analysis
- [ ] Processing power sufficient
- [ ] Memory usage within limits
- [ ] Communication bandwidth adequate
- [ ] Power budget achievable
- [ ] Environmental specs meetable

## Testing Approach

### Test Planning
- [ ] Unit test strategy defined
- [ ] Integration test approach outlined
- [ ] System test cases identified
- [ ] Environmental test plan drafted
- [ ] Field test locations identified

### Test Equipment
- [ ] Required equipment identified
- [ ] Test fixtures conceptualized
- [ ] Automated testing considered
- [ ] Calibration requirements noted

## Risk Assessment Update

### Technical Risks
- [ ] New risks identified
- [ ] Existing risks reassessed
- [ ] Mitigation strategies updated
- [ ] Risk owners assigned
- [ ] Contingency plans defined

### Schedule Risks
- [ ] Critical path identified
- [ ] Long-lead items ordered
- [ ] Resource conflicts resolved
- [ ] Dependencies mapped

## Compliance & Standards

### Regulatory
- [ ] Applicable standards identified
- [ ] Pre-compliance testing planned
- [ ] Certification timeline defined
- [ ] Documentation requirements known

### Industry Standards
- [ ] IPC standards identified (if applicable)
- [ ] Software standards selected
- [ ] Test standards defined
- [ ] Quality standards adopted

## Review Meeting Checklist

### During the Review
- [ ] Attendance recorded
- [ ] Previous action items reviewed
- [ ] Presentation follows agenda
- [ ] Technical questions answered
- [ ] Risks discussed thoroughly
- [ ] Schedule reviewed realistically

### Design Maturity Assessment

**Requirements Coverage:** _____%  
**Design Completeness:** _____%  
**Risk Mitigation:** _____%  
**Confidence Level:** High / Medium / Low

### Action Items

| Item | Description | Owner | Due Date | Priority |
|------|------------|-------|----------|----------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

## Review Decision

### Recommendation
- [ ] **Proceed to CDR** - Design is mature, risks acceptable
- [ ] **Proceed with Actions** - Minor items to address
- [ ] **Revise and Re-review** - Significant issues found
- [ ] **Major Redesign Required** - Fundamental issues

### Conditions for Proceeding
1. ________________________________
2. ________________________________
3. ________________________________

### Review Board Signatures

_____________________  
Technical Lead  
Date: _______

_____________________  
Hardware Representative  
Date: _______

_____________________  
Firmware Representative  
Date: _______

_____________________  
Quality Manager  
Date: _______

## Post-Review Actions

- [ ] Minutes distributed (T+1 day)
- [ ] Action items entered in tracker
- [ ] Risk register updated
- [ ] Schedule updated if needed
- [ ] Stakeholders notified of outcome

---

## Notes Section

### Key Discussion Points
_[Space for meeting notes]_

### Parking Lot Items
_[Items for future discussion]_

### Lessons Learned
_[What went well, what could improve]_

---

**Template Version:** 1.0  
**Last Updated:** January 2024  
**Next Review:** July 2024
