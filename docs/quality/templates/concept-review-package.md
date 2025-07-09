---
title: Concept Review Package Template
sidebar_position: 1
---

# Concept Review Package Template

Use this template to prepare for a Concept Design Review (CDR). Copy and customize for your project.

---

## Project Information

**Project Name:** [Your Project Name]  
**Project Code:** [e.g., ARB-2024-001]  
**Review Date:** [Scheduled Date]  
**Review Type:** Concept Design Review (CDR)  
**Project Manager:** [Name]  
**Technical Lead:** [Name]

## Executive Summary

[2-3 paragraph summary of the project concept, key objectives, and proposed approach]

## Requirements Overview

### Stakeholder Needs

| Stakeholder | Need | Priority | Notes |
|-------------|------|----------|-------|
| [User Group] | [What they need] | High/Med/Low | [Context] |
| | | | |

### Functional Requirements

| ID | Requirement | Acceptance Criteria | Priority |
|----|-------------|-------------------|----------|
| FR-001 | [What it must do] | [How to verify] | High/Med/Low |
| FR-002 | | | |

### Non-Functional Requirements

| Category | Requirement | Target | Notes |
|----------|-------------|--------|-------|
| Performance | [e.g., Battery life] | [e.g., >6 months] | [Context] |
| Environmental | [e.g., Operating temp] | [e.g., -20°C to +60°C] | |
| Regulatory | [e.g., FCC Part 15] | [Compliance required] | |

## Concept Design

### System Architecture

```
[Insert block diagram or architecture sketch]

Example ASCII diagram:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Sensors   │────▶│  Processor  │────▶│   Comms     │
└─────────────┘     └─────────────┘     └─────────────┘
                            │
                            ▼
                    ┌─────────────┐
                    │   Storage   │
                    └─────────────┘
```

### Technology Selection

| Component | Option 1 | Option 2 | Recommendation | Rationale |
|-----------|----------|----------|----------------|-----------|
| Processor | [e.g., STM32L4] | [e.g., nRF52] | [Choice] | [Why] |
| Communications | | | | |
| Power Source | | | | |

### Key Design Decisions

1. **Decision:** [What was decided]
   - **Rationale:** [Why this approach]
   - **Alternatives considered:** [What else was evaluated]
   - **Trade-offs:** [Pros and cons]

2. **Decision:** 
   - **Rationale:** 
   - **Alternatives considered:** 
   - **Trade-offs:** 

## Risk Assessment

### Technical Risks

| Risk | Probability | Impact | Mitigation Strategy | Owner |
|------|-------------|--------|-------------------|--------|
| [e.g., GPS acquisition time] | High/Med/Low | High/Med/Low | [How to address] | [Name] |
| | | | | |

### Project Risks

| Risk | Probability | Impact | Mitigation Strategy | Owner |
|------|-------------|--------|-------------------|--------|
| [e.g., Component lead time] | High/Med/Low | High/Med/Low | [How to address] | [Name] |
| | | | | |

## Resource Requirements

### Team

| Role | Person | Allocation | Duration |
|------|--------|------------|----------|
| Hardware Engineer | [Name] | [%] | [Weeks] |
| Firmware Engineer | | | |
| Project Manager | | | |

### Budget Estimate

| Category | Estimate | Notes |
|----------|----------|-------|
| Development NRE | £[Amount] | [What's included] |
| Prototype Hardware | £[Amount] | [Quantity and iterations] |
| Testing & Certification | £[Amount] | [What testing] |
| **Total** | **£[Amount]** | |

### Timeline

| Milestone | Target Date | Duration | Dependencies |
|-----------|-------------|----------|--------------|
| CDR Complete | [Date] | - | - |
| PDR | [Date] | [Weeks after CDR] | CDR approval |
| First Prototype | [Date] | [Weeks] | Long-lead parts |
| Testing Complete | [Date] | [Weeks] | Prototype ready |

## Compliance Requirements

| Standard/Regulation | Applicability | Impact | Notes |
|-------------------|---------------|---------|-------|
| [e.g., FCC Part 15] | Required | Design constraints | [Details] |
| [e.g., IP68] | Required | Enclosure design | |
| [e.g., CE marking] | If EU deployment | Documentation | |

## Open Questions

1. **Question:** [What needs to be resolved]
   - **Impact:** [Why it matters]
   - **Required by:** [When we need answer]
   - **Owner:** [Who will resolve]

2. **Question:** 
   - **Impact:** 
   - **Required by:** 
   - **Owner:** 

## Recommendations

Based on our analysis, we recommend:

1. **Proceed with concept** - The approach is technically feasible and meets requirements
2. **Key actions before PDR:**
   - [Action 1]
   - [Action 2]
   - [Action 3]

## Attachments

- [ ] Detailed requirements document
- [ ] Technology trade study
- [ ] Preliminary BOM
- [ ] Risk register (full version)
- [ ] Reference designs reviewed

---

## Review Meeting Notes

**Date:** [To be filled during review]  
**Attendees:** [To be filled during review]

### Discussion Points
[To be filled during review]

### Action Items
| Action | Owner | Due Date |
|--------|-------|----------|
| | | |

### Decision
- [ ] Approved to proceed to PDR
- [ ] Approved with conditions: ________________
- [ ] Requires revision and re-review
- [ ] Not approved

**Review Board Signatures:**

_____________________  
Technical Lead  
Date: _______

_____________________  
Quality Manager  
Date: _______

_____________________  
Project Manager  
Date: _______

---

**Template Version:** 1.0  
**Last Updated:** January 2024  
**Template Owner:** Quality Team
