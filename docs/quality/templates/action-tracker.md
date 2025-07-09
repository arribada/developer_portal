---
title: Action Tracker Template
sidebar_position: 4
---

# Design Review Action Tracker Template

Use this spreadsheet-compatible template to track action items from design reviews and ensure timely closure.

---

## Instructions

1. Copy this template into your preferred spreadsheet application (Excel, Google Sheets, etc.)
2. Update the project information
3. Add action items as they arise during reviews
4. Update status regularly (weekly recommended)
5. Review in team meetings

## Action Tracker

**Project Name:** _____________________  
**Last Updated:** _____________________  
**Updated By:** _____________________

### Action Items Table

| ID | Review Type | Date Raised | Description | Owner | Due Date | Priority | Status | Progress Notes | Date Closed |
|----|-------------|-------------|-------------|--------|----------|----------|---------|----------------|-------------|
| 001 | CDR | 2024-01-15 | Update power budget with measured values | J.Smith | 2024-01-22 | High | Open | Measurements in progress | |
| 002 | CDR | 2024-01-15 | Complete EMC pre-testing | M.Jones | 2024-02-01 | High | In Progress | Test booked for Jan 28 | |
| 003 | PDR | 2023-12-10 | Validate GPS antenna pattern | K.Chen | 2024-01-20 | Medium | Closed | Pattern meets spec | 2024-01-18 |
| 004 | | | | | | | | | |
| 005 | | | | | | | | | |

### Status Definitions

- **Open**: Not yet started
- **In Progress**: Work has begun
- **Blocked**: Cannot proceed due to dependency
- **In Review**: Completed, awaiting verification
- **Closed**: Completed and verified
- **Cancelled**: No longer required

### Priority Definitions

- **Critical**: Blocks progress, must be resolved immediately
- **High**: Required before next milestone
- **Medium**: Should be completed as scheduled
- **Low**: Nice to have, can be deferred if needed

## Summary Dashboard

### By Status
| Status | Count | Percentage |
|--------|-------|------------|
| Open | 5 | 25% |
| In Progress | 8 | 40% |
| Blocked | 2 | 10% |
| In Review | 3 | 15% |
| Closed | 2 | 10% |
| **Total** | **20** | **100%** |

### By Priority
| Priority | Total | Open | In Progress | Blocked | Closed |
|----------|-------|------|-------------|---------|---------|
| Critical | 2 | 1 | 1 | 0 | 0 |
| High | 8 | 2 | 4 | 1 | 1 |
| Medium | 7 | 2 | 2 | 1 | 2 |
| Low | 3 | 0 | 1 | 0 | 2 |

### By Owner
| Owner | Total | Open | In Progress | Overdue |
|-------|-------|------|-------------|---------|
| J.Smith | 5 | 2 | 2 | 1 |
| M.Jones | 4 | 1 | 3 | 0 |
| K.Chen | 3 | 0 | 1 | 0 |
| Team | 8 | 2 | 2 | 1 |

### Age Analysis
| Age | Count | Items |
|-----|-------|-------|
| < 1 week | 3 | 018, 019, 020 |
| 1-2 weeks | 5 | 013, 014, 015, 016, 017 |
| 2-4 weeks | 7 | 006-012 |
| > 4 weeks | 5 | 001-005 |

## Escalation List

### Overdue Items (Immediate Attention Required)

| ID | Description | Owner | Due Date | Days Overdue | Escalation Notes |
|----|-------------|-------|----------|--------------|------------------|
| 001 | Power budget update | J.Smith | 2024-01-22 | 3 | Blocking CDR closure |
| 007 | Thermal analysis | K.Chen | 2024-01-20 | 5 | Impacts enclosure design |

### Blocked Items (Resolution Required)

| ID | Description | Owner | Blocked By | Action Required |
|----|-------------|-------|------------|-----------------|
| 009 | Antenna testing | M.Jones | Chamber availability | Book external facility |
| 012 | Cost analysis | Finance | BOM finalization | Complete component selection |

## Meeting Notes Template

### Weekly Review Meeting

**Date:** _____________  
**Attendees:** _____________

**Items Reviewed:**
- [ ] All overdue items discussed
- [ ] Blocked items addressed
- [ ] New items added
- [ ] Closed items verified

**Key Decisions:**
1. _________________________________
2. _________________________________

**Escalations Required:**
1. _________________________________
2. _________________________________

## Metrics and Trends

### Closure Rate
```
Week 1: Opened: 5, Closed: 2, Net: +3
Week 2: Opened: 3, Closed: 4, Net: -1
Week 3: Opened: 4, Closed: 3, Net: +1
Week 4: Opened: 2, Closed: 5, Net: -3
```

### Average Days to Close
- Critical: 2.5 days
- High: 5.2 days
- Medium: 8.7 days
- Low: 12.3 days

### On-Time Completion Rate
- This Month: 85%
- Last Month: 78%
- Target: >90%

## Best Practices

### For Action Item Creation
1. **Be Specific**: "Update thermal model with measured data" not "Fix thermal issue"
2. **Set Realistic Dates**: Consider dependencies and resource availability
3. **Assign Clear Owners**: One person accountable, even for team tasks
4. **Define Success**: What does "done" look like?

### For Tracking
1. **Update Weekly**: Stale data leads to poor decisions
2. **Communicate Blocks Early**: Don't wait until due date
3. **Celebrate Closures**: Acknowledge completed work
4. **Review Metrics**: Look for patterns and improve

### For Meetings
1. **Focus on Exceptions**: Overdue and blocked items first
2. **Time Box Discussions**: Park detailed technical discussions
3. **Document Decisions**: Capture who decided what and why
4. **Plan Ahead**: Look at upcoming due dates

## Export/Import Format

For integration with other tools, use this CSV format:

```csv
ID,ReviewType,DateRaised,Description,Owner,DueDate,Priority,Status,ProgressNotes,DateClosed
001,CDR,2024-01-15,"Update power budget with measured values",J.Smith,2024-01-22,High,Open,"Measurements in progress",
002,CDR,2024-01-15,"Complete EMC pre-testing",M.Jones,2024-02-01,High,In Progress,"Test booked for Jan 28",
```

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Quality Team | Initial template |
| | | | |

---

**Note:** This template is designed to be flexible. Add or remove columns based on your project needs. The key is consistent tracking and regular review.

**For automated tracking**, consider using:
- GitHub Projects
- Jira
- Asana
- Monday.com
- Microsoft Project

The principles remain the same regardless of tool choice.
