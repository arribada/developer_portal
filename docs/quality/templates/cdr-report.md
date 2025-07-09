---
title: CDR Report Template
sidebar_position: 3
---

# Critical Design Review (CDR) Report Template

This template documents the outcome of a Critical Design Review, capturing the final design state before production/release.

---

## Executive Summary

**Project Name:** [Project Name]  
**CDR Date:** [Date]  
**Report Date:** [Date]  
**Report Author:** [Name]  
**Review Outcome:** [Approved / Conditional / Not Approved]

### Summary Statement
[2-3 paragraphs summarizing the design, review findings, and readiness for production]

## Project Overview

### Objectives
1. [Primary objective]
2. [Secondary objective]
3. [Additional objectives]

### Success Criteria
- [ ] [Criterion 1 - with measurable target]
- [ ] [Criterion 2 - with measurable target]
- [ ] [Criterion 3 - with measurable target]

### Scope
**In Scope:**
- [What's included]

**Out of Scope:**
- [What's excluded]

## Design Summary

### System Architecture

[Insert final system architecture diagram]

### Key Specifications

| Parameter | Requirement | Design Target | Achieved | Status |
|-----------|-------------|---------------|----------|---------|
| Battery Life | >6 months | 8 months | 7.5 months | ✓ Pass |
| Operating Temp | -20 to +60°C | -25 to +65°C | -25 to +65°C | ✓ Pass |
| GPS Accuracy | < 10m | < 5m | < 5m | ✓ Pass |
| Unit Cost | < £150 | £145 | £142 | ✓ Pass |

### Hardware Design Summary

**Final Specifications:**
- PCB Dimensions: [L x W] mm
- Layer Count: [N] layers
- Component Count: [N] components
- Power Consumption: [N] mA active, [N] µA sleep
- Environmental Rating: IP[XX]

**Key Components:**
| Function | Part Number | Manufacturer | Status |
|----------|-------------|--------------|---------|
| Processor | [P/N] | [Mfg] | In stock |
| GPS | | | |
| Communications | | | |

### Firmware Design Summary

**Architecture:**
- RTOS: [Zephyr/FreeRTOS/Bare metal]
- Memory Usage: [N]KB Flash, [N]KB RAM
- Task Count: [N] tasks/threads
- Update Mechanism: [OTA/USB/etc]

**Key Metrics:**
- Code Size: [N] KB
- Stack Usage: [N]% maximum
- CPU Usage: [N]% average
- Boot Time: [N] seconds

## Requirements Verification

### Requirements Traceability

| Req ID | Requirement | Verification Method | Result | Evidence |
|--------|-------------|-------------------|---------|-----------|
| FR-001 | [Requirement text] | Test/Analysis/Demo | Pass/Fail | [Test report #] |
| FR-002 | | | | |
| NFR-001 | | | | |

**Requirements Coverage:** [N]% verified

### Verification Summary

**Testing Completed:**
- Unit Testing: [N]% coverage
- Integration Testing: [N] test cases passed
- System Testing: [N] scenarios validated
- Environmental Testing: [Passed/In Progress]
- Field Testing: [N] units for [N] days

## Test Results Summary

### Functional Testing

| Test Category | Total Tests | Passed | Failed | Pass Rate |
|--------------|-------------|---------|---------|-----------|
| Power Management | 25 | 25 | 0 | 100% |
| Communications | 40 | 38 | 2* | 95% |
| Sensors | 30 | 30 | 0 | 100% |
| **Total** | **95** | **93** | **2** | **97.9%** |

*Failed tests have approved waivers - see section X

### Environmental Testing

| Test | Specification | Result | Status |
|------|--------------|---------|---------|
| Temperature Cycling | -20°C to +60°C, 10 cycles | Passed | ✓ |
| Humidity | 95% RH, 48 hours | Passed | ✓ |
| Vibration | MIL-STD-810G | Passed | ✓ |
| Drop Test | 1.5m, 6 orientations | Passed | ✓ |
| Water Ingress | IP68, 2m for 24h | Passed | ✓ |

### Performance Testing

```
Battery Life Test Results:
- Configuration: Standard deployment
- Temperature: 25°C
- Result: 225 days (requirement: >180 days)
- Margin: 25%

GPS Performance:
- Cold Start TTFF: 28s average (requirement: <35s)
- Hot Start TTFF: 3s average
- Accuracy: 4.2m CEP50 (requirement: <10m)

Communication Success Rate:
- Satellite uplink: 96.5% (requirement: >85%)
- Cellular: 99.2% (requirement: >95%)
```

## Manufacturing Readiness

### Production Documentation
- [x] Assembly drawings complete
- [x] BOM finalized and costed
- [x] Assembly instructions written
- [x] Test procedures documented
- [x] Packaging specifications defined

### Manufacturing Partner Assessment
- Partner: [Name]
- Capacity: [N] units/month
- Lead Time: [N] weeks
- Quality System: ISO 9001:2015
- Previous Experience: [Relevant products]

### First Article Plan
- Build Quantity: [N] units
- Timeline: [Date range]
- Test Coverage: 100%
- Success Criteria: [Define]

## Risk Assessment Update

### Closed Risks
1. **GPS acquisition in canopy** - Resolved with high-sensitivity receiver
2. **Battery life in cold** - Mitigated with temperature compensation

### Remaining Risks

| Risk | Probability | Impact | Mitigation | Status |
|------|-------------|--------|-----------|---------|
| Component shortage | Low | High | Second source identified | Monitoring |
| Regulatory delay | Medium | Medium | Pre-testing completed | In progress |

## Quality Metrics

### Design Metrics
- FMEA Completed: Yes
- DFM Review: Passed
- Code Complexity: Low (Cyclomatic < 10)
- Documentation Coverage: 100%

### Predicted Field Performance
- MTBF: >50,000 hours
- First Year Survival: >95%
- Customer Sat Target: >90%

## Compliance Status

| Standard | Requirement | Status | Evidence |
|----------|------------|---------|-----------|
| FCC Part 15 | Emissions compliance | Pre-tested | Report #XXX |
| CE RED | Radio equipment directive | Planned | Q2 2024 |
| RoHS | Hazardous substances | Compliant | BOM analysis |
| REACH | Chemical safety | Compliant | Declaration |

## Action Items from Review

| ID | Action | Owner | Due Date | Priority | Status |
|----|--------|-------|----------|----------|---------|
| CDR-001 | Update user manual with final specs | [Name] | [Date] | High | Open |
| CDR-002 | Complete FCC testing | [Name] | [Date] | High | Open |
| CDR-003 | Finalize packaging design | [Name] | [Date] | Medium | Open |

## Review Board Assessment

### Technical Readiness: [Score]/10
**Strengths:**
- [Key strength 1]
- [Key strength 2]

**Areas for Attention:**
- [Concern 1 with mitigation]
- [Concern 2 with mitigation]

### Schedule Assessment
- Current Status: [On track / At risk / Behind]
- Production Start: [Date]
- Risk Factors: [List]

### Cost Assessment
- Development Cost: [Status vs budget]
- Unit Cost: [Achieved vs target]
- Total Program: [Status]

## Recommendations

The review board recommends:

1. **[Primary recommendation]**
   - Rationale: [Why]
   - Conditions: [Any conditions]

2. **[Secondary recommendations]**

## Approval

### Review Board Decision

- [x] **Approved for Production/Release**
- [ ] Approved with Conditions (see below)
- [ ] Not Approved - Requires Rework

### Conditions for Approval (if applicable)
1. _________________________________
2. _________________________________

### Sign-offs

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead | [Name] | __________ | _____ |
| Quality Manager | [Name] | __________ | _____ |
| Project Manager | [Name] | __________ | _____ |
| Customer Rep | [Name] | __________ | _____ |

## Appendices

### A. Detailed Test Reports
- [Link to test report repository]

### B. Design Documentation
- [Link to design package]

### C. Risk Register
- [Link to full risk analysis]

### D. Meeting Minutes
- [Link to CDR meeting recording/notes]

### E. Action Item Tracker
- [Link to project tracking system]

---

**Document Control:**
- Template Version: 1.0
- Report Version: [X.X]
- Classification: [Public/Internal/Confidential]
- Distribution: [List]

**Next Steps:**
1. Address all action items by due dates
2. Proceed with production preparation
3. Schedule Production Readiness Review for [Date]
