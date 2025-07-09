---
title: Version Control
sidebar_position: 4
---

# Version Control Guidelines

We use Git for version control with a structured workflow that ensures code quality and traceability. This guide covers our branching strategy, commit conventions, and release process.

## Repository Structure

### Monorepo vs Multi-repo
- **Platform Core**: Monorepo for shared components
- **Project-Specific**: Separate repos for distinct projects
- **Hardware Designs**: Versioned releases with manufacturing tags

## Branching Strategy

### GitFlow Model
```
main
  └── develop
       ├── feature/your-name/feature-description
       ├── bugfix/issue-number-description
       └── release/v1.2.0
```

### Branch Types

#### Main Branch (`main`)
- Production-ready code only
- Protected branch - no direct commits
- All commits tagged with release versions

#### Development Branch (`develop`)
- Integration branch for features
- Must pass all CI/CD checks
- Base for all feature branches

#### Feature Branches
Format: `feature/your-name/brief-description`
```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/jason/horizon-power-optimisation

# Work on feature
git add .
git commit -m "feat: implement dynamic power scaling for satellite comms"

# Keep updated with develop
git fetch origin
git rebase origin/develop
```

#### Bugfix Branches
Format: `bugfix/issue-number-description`
```bash
git checkout -b bugfix/123-fix-sensor-timeout
```

#### Release Branches
Format: `release/vX.Y.Z`
- Created from develop when ready for release
- Only bug fixes allowed
- Merged to both main and develop

## Commit Conventions

### Conventional Commits Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or modifications
- `build`: Build system changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't affect source

### Examples

```bash
# Feature commit
git commit -m "feat(horizon): add temperature compensation for GPS

Implements dynamic temperature compensation algorithm to improve
GPS accuracy in extreme conditions. Tested from -40°C to +85°C.

Closes #234"

# Fix commit
git commit -m "fix(marlin): correct data packet alignment issue

Data packets were misaligned when payload exceeded 255 bytes.
Added proper boundary checking and alignment padding.

Fixes #456"

# Breaking change
git commit -m "feat(api)!: update telemetry endpoint response format

BREAKING CHANGE: The telemetry endpoint now returns data in a 
nested structure. Update client libraries accordingly.

Migration guide: docs/migrations/v2-telemetry.md"
```

### Commit Message Guidelines
1. **Subject line**: 50 characters max, imperative mood
2. **Body**: Wrap at 72 characters, explain what and why
3. **Footer**: Reference issues, breaking changes
4. **Task reference**: Always reference the task/issue you're working on

Example with task reference:
```bash
feat(gps): implement temperature compensation algorithm

Adds dynamic temperature compensation to improve GPS accuracy in 
extreme conditions. The algorithm adjusts acquisition timeout based 
on ambient temperature readings from the onboard sensor.

- Tested from -40°C to +85°C
- Improves TTFF by 15% in cold conditions
- No impact on power consumption

Task: ARB-234
Closes #456
```

### Sign Your Commits
```bash
# Configure git to sign commits
git config --global user.name "Your Name"
git config --global user.email "your.name@arribada.org"

# Sign a commit
git commit -S -m "feat: add new feature"
```
## Pull Request Process

### Creating a Pull Request

1. **Ensure branch is up to date**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **Run pre-commit checks**
   ```bash
   make lint
   make test
   make build
   ```

3. **Push branch**
   ```bash
   git push origin feature/your-name/feature-description
   ```

4. **Create PR via GitHub**
   - Use PR template
   - Link related issues
   - Assign reviewers
   - Add appropriate labels

### PR Template
```markdown
## Description
Brief description of what this PR does and why it's needed.

## Related Issues
Closes #123
Related to #456

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass locally
- [ ] Integration tests pass
- [ ] Tested on hardware (specify which)
- [ ] Tested in field conditions

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No warnings generated
- [ ] Dependent changes merged
```

### Review Process

#### For Contributors
1. Address all review comments
2. Use "Resolve conversation" when fixed
3. Request re-review after changes
4. Keep PR up to date with base branch

#### For Reviewers
1. Check functionality against requirements
2. Verify code style compliance
3. Ensure adequate test coverage
4. Consider performance implications
5. Look for security issues

## Release Process

### Version Numbering
We use [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Release Workflow

1. **Create Release Branch**
   ```bash
   git checkout -b release/v1.2.0 develop
   ```

2. **Update Version Files**
   - `version.txt`
   - `package.json` (if applicable)
   - Hardware revision files
   - Documentation

3. **Generate Changelog**
   ```bash
   make changelog VERSION=v1.2.0
   ```

4. **Create Release PR**
   - Target: main
   - Reviewers: Tech leads
   - Tests: Full regression suite

5. **Tag Release**
   ```bash
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push origin v1.2.0
   ```

6. **Post-Release**
   - Merge back to develop
   - Update documentation site
   - Notify community

## Working with Submodules

Some projects use git submodules for dependencies:

```bash
# Clone with submodules
git clone --recursive https://github.com/arribada/project.git

# Update submodules
git submodule update --init --recursive

# Pull latest submodule changes
git submodule update --remote
```

## Git Tips & Tricks

### Useful Aliases
Add to `~/.gitconfig`:
```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    plog = log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
```

### Interactive Rebase
Clean up commits before PR:
```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# In editor, you can:
# - squash: combine commits
# - reword: change commit message
# - drop: remove commit
# - reorder: change commit order
```

### Recovering from Mistakes
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Find lost commits
git reflog

# Recover lost commit
git checkout <commit-hash>
```

## Next Steps

- Review our [Testing Guidelines](./testing.md)
- Understand [Code Review](./code-review.md) process
- Learn about [CI/CD Pipeline](./ci-cd.md)
- Start contributing!
