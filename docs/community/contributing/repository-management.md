---
title: Repository Management
sidebar_position: 9
---

# Repository Management

Efficient repository management is crucial for small teams and individual contributors working on open-source projects. This guide covers our policies for branching, forking, ownership, and automation.

## Project Ownership

### CODEOWNERS
Every repository must have a `CODEOWNERS` file defining who owns different parts of the codebase:

```bash
# .github/CODEOWNERS
# Global owners
* @arribada/core-team

# Platform-specific owners
/firmware/ @mathieu @tom
/hardware/ @claudia @pete
/cloud/ @sarah @james
/docs/ @arribada/documentation-team

# Critical files requiring multiple reviewers
/firmware/core/ @mathieu @tom @arribada/firmware-leads
*.security @arribada/security-team
```

### Rule of Two
Critical code sections require review from at least two maintainers:
- Core platform functionality
- Security-related code
- API changes
- Hardware safety systems
- Release configurations

## Branching Strategy

### Fork and Pull Model
For external contributors:
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/arribada-platform.git
cd arribada-platform

# Add upstream remote
git remote add upstream https://github.com/arribada/platform.git

# Create feature branch
git checkout -b feature/gps-optimization

# Keep fork updated
git fetch upstream
git rebase upstream/develop
```

### Branch Protection Rules
Configure in GitHub repository settings:
```yaml
# .github/branch-protection.yml
protection_rules:
  main:
    required_reviews: 2
    dismiss_stale_reviews: true
    require_code_owner_reviews: true
    required_status_checks:
      - continuous-integration/build
      - continuous-integration/test
      - security/scan
    enforce_admins: false
    restrictions:
      users: []
      teams:
        - core-team

  develop:
    required_reviews: 1
    required_status_checks:
      - continuous-integration/build
      - continuous-integration/test
```

## Automated Merge Requirements

### Merge Automation
We use GitHub's auto-merge feature with strict requirements:

```yaml
# .github/auto-merge.yml
auto_merge:
  # Automatically merge when all conditions are met
  delete_branch_on_merge: true
  merge_method: squash
  
  rules:
    - name: Dependabot updates
      conditions:
        - author: dependabot[bot]
        - status-check: continuous-integration/build
        - status-check: security/scan
      
    - name: Documentation updates
      conditions:
        - files: "docs/**"
        - approved-reviews: 1
        - status-check: docs/build
```

### PR Merge Criteria
Pull requests can only be merged when:
- ✅ All CI/CD checks pass
- ✅ Required number of approvals received
- ✅ No unresolved conversations
- ✅ Branch is up to date with base
- ✅ Code coverage maintained or improved
- ✅ Documentation updated (if applicable)

## Test-Driven Development (TDD)

### TDD Workflow
1. **Write failing test first**
   ```c
   // test_gps_module.c
   void test_gps_cold_start(void)
   {
       struct gps_fix fix;
       int ret = gps_acquire_fix(&fix, GPS_MODE_COLD, K_SECONDS(30));
       zassert_equal(ret, 0, "GPS cold start failed");
       zassert_true(fix.valid, "Invalid fix returned");
   }
   ```

2. **Write minimal code to pass**
   ```c
   // gps_module.c
   int gps_acquire_fix(struct gps_fix *fix, enum gps_mode mode, k_timeout_t timeout)
   {
       // Minimal implementation
       fix->valid = true;
       return 0;
   }
   ```

3. **Refactor with confidence**
   ```c
   // Actual implementation with full functionality
   int gps_acquire_fix(struct gps_fix *fix, enum gps_mode mode, k_timeout_t timeout)
   {
       // Full implementation...
   }
   ```

### TDD Requirements
- New features must have tests written first
- Bug fixes must include regression tests
- Tests must be meaningful (not just for coverage)
- Each PR must show test-first commits

## Semantic Versioning

### Version Format
We follow [Semantic Versioning 2.0.0](https://semver.org/):
```
MAJOR.MINOR.PATCH-PRERELEASE+BUILD
```

Examples:
- `1.0.0` - First stable release
- `1.1.0` - New backward-compatible features
- `1.1.1` - Backward-compatible bug fixes
- `2.0.0` - Breaking changes
- `2.0.0-alpha.1` - Pre-release version
- `2.0.0+20240115` - Build metadata

### Automated Versioning
Configure semantic-release in `.releaserc.yml`:
```yaml
branches:
  - main
  - name: beta
    prerelease: true

plugins:
  - "@semantic-release/commit-analyzer"
  - "@semantic-release/release-notes-generator"
  - "@semantic-release/changelog"
  - - "@semantic-release/git"
    - assets:
        - CHANGELOG.md
        - package.json
      message: "chore(release): ${nextRelease.version} [skip ci]"
  - "@semantic-release/github"
```

### Version Tagging
```bash
# Automatic versioning based on commits
# feat: Minor version bump
# fix: Patch version bump
# BREAKING CHANGE: Major version bump

# Manual version tag (discouraged)
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin v1.2.3
```

## Pair Programming

### Cross-Discipline Pairing
We encourage pairing across disciplines:
- **Firmware + Hardware**: Ensure hardware compatibility
- **Backend + Frontend**: API design alignment
- **Developer + QA**: Test strategy development
- **Engineer + Documentation**: Technical accuracy

### Remote Pair Programming Tools
- **VS Code Live Share**: Real-time collaborative editing
- **Tuple**: Purpose-built pair programming
- **Screen sharing**: Zoom, Discord, Google Meet
- **tmux**: Terminal sharing for embedded development

### Pairing Guidelines
1. **Driver/Navigator model**: Switch roles every 30 minutes
2. **Clear objectives**: Define what you're solving together
3. **Documentation**: Update docs during pairing session
4. **Knowledge transfer**: Pair experienced with new developers

## CI/CD Automation

### Automated Checks
All PRs must pass automated checks:

```yaml
# .github/workflows/pr-automation.yml
name: PR Automation

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          
  size-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check PR size
        run: |
          # Fail if PR is too large
          if [ $(git diff --stat ${{ github.event.pull_request.base.sha }} | wc -l) -gt 50 ]; then
            echo "PR too large. Please break into smaller commits."
            exit 1
          fi
          
  commit-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: wagoid/commitlint-github-action@v5
```

### Quality Gates
Configure SonarQube in `sonar-project.properties`:
```properties
sonar.projectKey=arribada-platform
sonar.organization=arribada
sonar.sources=src
sonar.tests=tests
sonar.python.coverage.reportPaths=coverage.xml
sonar.c.file.suffixes=.c,.h
sonar.cpp.file.suffixes=.cpp,.hpp

# Quality gate conditions
sonar.qualitygate.wait=true
```

### Coverage Requirements
Enforce in `.gitlab-ci.yml` or GitHub Actions:
```yaml
coverage:
  stage: test
  script:
    - make test-coverage
    - |
      COVERAGE=$(grep -Po '(?<=Total coverage: )\d+' coverage.txt)
      if [ $COVERAGE -lt 80 ]; then
        echo "Coverage $COVERAGE% is below 80% threshold"
        exit 1
      fi
  coverage: '/Total coverage: \d+/'
```

## Release Automation

### Automated Release Process
Releases are triggered by Git tags:

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Generate Changelog
        id: changelog
        uses: TriPSs/conventional-changelog-action@v3
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Create Release
        uses: actions/create-release@v1
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: ${{ steps.changelog.outputs.clean_changelog }}
          
      - name: Build Release Artifacts
        run: make release
        
      - name: Upload Artifacts
        uses: actions/upload-release-asset@v1
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./dist/
```

### Release Checklist
Automated checks before release:
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG generated
- [ ] Version bumped correctly
- [ ] Security scan passed
- [ ] Performance benchmarks met

## Repository Templates

### New Repository Setup
Use our template for consistent setup:
```bash
# Create from template
gh repo create arribada/new-project --template arribada/template-repo

# Automatic setup includes:
# - Branch protection rules
# - CI/CD workflows  
# - CODEOWNERS file
# - Issue templates
# - PR templates
# - Security policies
```

### Essential Files
Every repository must include:
```
.github/
├── CODEOWNERS
├── CONTRIBUTING.md
├── SECURITY.md
├── workflows/
│   ├── ci.yml
│   ├── security.yml
│   └── release.yml
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
│   └── config.yml
└── pull_request_template.md
```

## Small Team Guidelines

### Minimum Viable Process
For projects with 2-3 developers:
1. **Simplified branching**: main + feature branches only
2. **Single reviewer**: But still required
3. **Automated testing**: Even more critical
4. **Clear ownership**: Each component has an owner
5. **Regular sync**: Weekly team reviews

### Individual Contributor Process
For solo developers on open-source repos:
1. **Self-review checklist**: Mandatory before merge
2. **Community review**: Request from Arribada community
3. **Extended CI/CD**: More automated checks
4. **Documentation first**: Write docs before code
5. **Public roadmap**: Transparency for contributors

## Next Steps

- Configure [Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- Set up [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- Implement [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
- Enable [Auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
