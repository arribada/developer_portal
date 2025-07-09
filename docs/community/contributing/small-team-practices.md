---
title: Small Team Best Practices
sidebar_position: 11
---

# Small Team Best Practices

Based on feedback from our engineers, here are the essential practices for running Arribada projects efficiently with small teams or individual contributors.

## Essential Practices Summary

### 🔑 Core Requirements

1. **Automated Everything**
   - Tests run automatically on every commit
   - Bots merge PRs when checks pass
   - Releases triggered by Git tags
   - Style formatting on save

2. **Test-Driven Development (TDD)**
   - Write tests first, always
   - Every bug fix includes a test
   - Tests document requirements
   - Coverage tracked automatically

3. **Clear Ownership**
   - CODEOWNERS file in every repo
   - Project leads defined
   - Review requirements clear
   - Escalation paths documented

4. **Version Control Discipline**
   - Semantic versioning enforced
   - Conventional commits required
   - Task/issue references in commits
   - Protected branches configured

5. **Pair Programming**
   - Cross-discipline collaboration
   - Knowledge sharing sessions
   - Remote pairing tools setup
   - Regular rotation schedule

## Implementation Checklist

### For New Projects

```bash
# 1. Create from template
gh repo create arribada/new-project --template arribada/template-repo

# 2. Configure branch protection
gh api repos/arribada/new-project/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["continuous-integration"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1}'

# 3. Set up automation
echo "auto_merge: true" > .github/auto-merge.yml

# 4. Install pre-commit hooks
pre-commit install
pre-commit install --hook-type commit-msg

# 5. Configure semantic release
npm install --save-dev semantic-release
echo '{"extends": "semantic-release"}' > .releaserc.json
```

### For Existing Projects

1. **Gradual Adoption**
   ```yaml
   # Start with warnings only
   style-check:
     continue-on-error: true
   ```

2. **Add Automation Incrementally**
   - Week 1: Add linters as warnings
   - Week 2: Add pre-commit hooks
   - Week 3: Enable test requirements
   - Week 4: Full enforcement

3. **Document Everything**
   - Update README with new processes
   - Create CONTRIBUTING.md
   - Add decision records (ADRs)

## Team Size Configurations

### Solo Developer

**Minimum Setup:**
- Pre-commit hooks for local checks
- GitHub Actions for CI/CD
- Auto-merge for dependency updates
- Community review process

**Key Files:**
```yaml
# .github/workflows/solo-dev.yml
name: Solo Developer Workflow
on: [push, pull_request]

jobs:
  all-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run all checks
        run: |
          make lint
          make test
          make coverage
      - name: Auto-approve (solo dev)
        if: github.actor == github.repository_owner
        uses: hmarr/auto-approve-action@v3
```

### 2-3 Person Team

**Additional Requirements:**
- Mandatory PR reviews (1 approval)
- Pair programming sessions
- Weekly sync meetings
- Shared on-call rotation

**Branch Protection:**
```json
{
  "required_reviews": 1,
  "dismiss_stale_reviews": true,
  "require_code_owner_reviews": false,
  "required_approving_review_count": 1
}
```

### 4-8 Person Team

**Full Process:**
- Code owners required
- 2 reviews for critical code
- Automated dependency updates
- Release candidates process
- Documentation requirements

**CODEOWNERS Example:**
```
# Global reviewers
* @arribada/core-team

# Component owners
/firmware/ @mathieu @tom
/hardware/ @claudia
/cloud/ @backend-team
/docs/ @all-contributors
```

## Automation Tools

### Essential GitHub Actions

1. **Commitlint** - Enforce commit messages
2. **Semantic Release** - Automated versioning
3. **Dependabot** - Dependency updates
4. **CodeQL** - Security scanning
5. **SonarCloud** - Code quality

### Recommended Services

**Free for Open Source:**
- GitHub Actions (CI/CD)
- Codecov (Coverage)
- SonarCloud (Quality)
- Dependabot (Dependencies)
- GitGuardian (Secrets)

**Self-Hosted Options:**
- GitLab CI/CD
- Jenkins
- DroneCI
- Gitea Actions

## Common Pitfalls

### What NOT to Do

❌ **Don't Skip Tests**
- "Just this once" becomes habit
- Technical debt accumulates
- Confidence erodes

❌ **Don't Ignore Linting**
- Inconsistent code is hard to maintain
- Style debates waste time
- Onboarding becomes difficult

❌ **Don't Bypass Process**
- Even for "urgent" fixes
- Process exists for safety
- Automation makes it fast

❌ **Don't Work in Isolation**
- Share work-in-progress
- Ask for help early
- Document decisions

### What TO Do

✅ **Automate Ruthlessly**
- If you do it twice, automate it
- Invest time in tooling
- Share automation scripts

✅ **Communicate Openly**
- Daily standups (even async)
- Clear PR descriptions
- Document blockers

✅ **Maintain Standards**
- Quality over speed
- Consistency matters
- Pride in craftsmanship

✅ **Learn Continuously**
- Pair with others
- Review code actively
- Share knowledge

## Metrics for Success

### Track These Metrics

1. **Velocity Metrics**
   - PR merge time: < 24 hours
   - Build time: < 10 minutes
   - Deploy frequency: Daily+

2. **Quality Metrics**
   - Test coverage: > 80%
   - Code review coverage: 100%
   - Post-deploy issues: < 5%

3. **Team Health**
   - Knowledge sharing sessions
   - Cross-training completed
   - Bus factor > 1

### Monthly Review

```markdown
## Team Retrospective Template

### What Worked Well
- [ ] Automated processes
- [ ] Code quality
- [ ] Team collaboration

### What Needs Improvement
- [ ] Bottlenecks identified
- [ ] Process friction
- [ ] Knowledge gaps

### Action Items
- [ ] Process improvements
- [ ] Tool additions
- [ ] Training needs
```

## Resources

### Templates and Examples
- [Repository Template](https://github.com/arribada/template-repo)
- [CI/CD Examples](https://github.com/arribada/ci-examples)
- [Pre-commit Configs](https://github.com/arribada/pre-commit-config)

### Training Materials
- [TDD Workshop Recording](#)
- [Git Workflow Tutorial](#)
- [Automation Best Practices](#)

### Community Support
- [Discord #small-teams](https://discord.gg/arribada)
- [Office Hours: Tuesdays 2pm UTC](#)
- [Pair Programming Partners](#)

## Get Started

1. **Choose your team size** configuration above
2. **Run the setup checklist** for your project
3. **Join the community** for support
4. **Iterate and improve** based on what works

Remember: The goal is sustainable, high-quality development that enables conservation impact, not perfect process adherence.
