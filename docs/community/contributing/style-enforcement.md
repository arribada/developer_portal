---
title: Style Guide Enforcement
sidebar_position: 10
---

# Style Guide Enforcement

Consistent code style across all repositories helps small teams work efficiently. This guide covers our automated style enforcement and linting configuration.

## Automated Style Checks

### Language-Specific Linters

#### C/C++ (Firmware)
Configure in `.clang-format`:
```yaml
---
Language: Cpp
BasedOnStyle: LLVM
IndentWidth: 4
TabWidth: 4
UseTab: Never
ColumnLimit: 100
PointerAlignment: Right
AlignAfterOpenBracket: Align
AlignConsecutiveAssignments: true
AlignConsecutiveDeclarations: true
AllowShortFunctionsOnASingleLine: None
AlwaysBreakAfterReturnType: None
BreakBeforeBraces: Allman
IndentCaseLabels: false
```

Run automatically:
```yaml
# .github/workflows/lint.yml
- name: Check C/C++ Format
  run: |
    find . -name "*.c" -o -name "*.h" -o -name "*.cpp" | 
    xargs clang-format --dry-run --Werror
```

#### Python
Configure in `pyproject.toml`:
```toml
[tool.black]
line-length = 88
target-version = ['py39']

[tool.isort]
profile = "black"
line_length = 88

[tool.pylint]
max-line-length = 88
disable = ["C0111", "R0903"]

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
```

#### JavaScript/TypeScript
Configure in `.eslintrc.json`:
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### Pre-commit Hooks
Install and configure pre-commit to catch issues before they reach CI:

`.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
      
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black
        language_version: python3.9
        
  - repo: https://github.com/pre-commit/mirrors-clang-format
    rev: v15.0.0
    hooks:
      - id: clang-format
        types_or: [c, c++]
        
  - repo: https://github.com/commitizen-tools/commitizen
    rev: v2.42.0
    hooks:
      - id: commitizen
        stages: [commit-msg]
```

Install for all developers:
```bash
# In repository root
pre-commit install
pre-commit install --hook-type commit-msg
```

## CI/CD Integration

### Style Check Job
Add to all CI pipelines:

```yaml
style-check:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
        
    - name: Run pre-commit
      uses: pre-commit/action@v3.0.0
      
    - name: Check commit messages
      run: |
        # Ensure all commits follow conventional format
        npm install -g @commitlint/cli @commitlint/config-conventional
        echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
        git log --format=%B -n 1 ${{ github.event.after }} | commitlint
```

### Automated Fixes
For approved contributors, enable automated style fixes:

```yaml
auto-format:
  if: github.event.pull_request.author_association == 'MEMBER'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
      with:
        token: ${{ secrets.BOT_TOKEN }}
        
    - name: Auto-format code
      run: |
        # Format all code
        pre-commit run --all-files
        
        # Commit if changes
        if [[ -n $(git status -s) ]]; then
          git config user.name "Arribada Bot"
          git config user.email "bot@arribada.org"
          git commit -am "style: auto-format code [skip ci]"
          git push
        fi
```

## Editor Configuration

### EditorConfig
Ensure consistent formatting across all editors with `.editorconfig`:

```ini
# EditorConfig is awesome: https://EditorConfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{c,h,cpp,hpp}]
indent_style = space
indent_size = 4

[*.py]
indent_style = space
indent_size = 4
max_line_length = 88

[*.{js,ts,jsx,tsx,json}]
indent_style = space
indent_size = 2

[*.{yml,yaml}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
```

### VS Code Settings
Share team settings in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.rulers": [80, 100],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  
  "[c]": {
    "editor.defaultFormatter": "ms-vscode.cpptools"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black"
}
```

## Documentation Style

### Markdown Linting
Configure markdownlint in `.markdownlint.json`:

```json
{
  "default": true,
  "MD013": {
    "line_length": 100,
    "tables": false,
    "code_blocks": false
  },
  "MD024": {
    "siblings_only": true
  },
  "MD033": {
    "allowed_elements": ["details", "summary", "img", "br"]
  }
}
```

### Documentation Templates
Enforce consistent documentation with templates:

```markdown
<!-- PULL_REQUEST_TEMPLATE.md -->
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Documentation
- [ ] Code comments updated
- [ ] README updated
- [ ] API docs updated

## Style
- [ ] Pre-commit hooks pass
- [ ] No linting warnings
```

## Enforcement Rules

### Merge Blocking
Style violations block merging:
```yaml
# branch protection rules
required_status_checks:
  strict: true
  contexts:
    - "style-check"
    - "lint"
    - "format-check"
```

### Gradual Adoption
For existing codebases:

1. **Phase 1**: Warning only
   ```yaml
   continue-on-error: true  # Don't block initially
   ```

2. **Phase 2**: New files only
   ```bash
   # Only check changed files
   git diff --name-only origin/main | xargs pre-commit run --files
   ```

3. **Phase 3**: Full enforcement
   ```bash
   # Check all files
   pre-commit run --all-files
   ```

## Team Guidelines

### For Small Teams
- Use pre-commit hooks to catch issues early
- Configure editors with shared settings
- Run formatters automatically on save
- Review style in pair programming sessions

### For Individual Contributors
- Install pre-commit hooks locally
- Use provided editor configurations
- Run style checks before pushing
- Ask for help if style issues arise

### Style Discussions
- Propose changes via RFC (Request for Comments)
- Test impact on existing code
- Get team consensus before changes
- Document decisions in this guide

## Common Issues

### Mixed Line Endings
```bash
# Fix line endings
find . -type f -name "*.c" -exec dos2unix {} \;
```

### Tab vs Spaces
```bash
# Convert tabs to spaces
find . -name "*.py" -exec sed -i 's/\t/    /g' {} \;
```

### Large Reformatting
```bash
# Create separate commit for style changes
git commit -m "style: apply formatting rules [skip ci]"
```

## Next Steps

- Install [pre-commit hooks](https://pre-commit.com/)
- Configure your [editor](#editor-configuration)
- Review language-specific [style guides](./code-standards.md)
- Set up [CI/CD integration](./ci-cd.md)
