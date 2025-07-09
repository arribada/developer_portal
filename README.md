# Arribada Developer Portal

The developer portal for Arribada - an open-source platform for conservation technology. Join us in making wildlife tracking accessible to researchers and conservation organisations globally.

## Quick Start

### Prerequisites
- Node.js 18+ (see `.nvmrc` for exact version)
- npm or yarn package manager
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/arribada/developer-portal.git
cd developer-portal

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:3000`

### Build for Production
```bash
# Create production build
npm run build

# Serve production build locally
npm run serve
```

## Project Structure

```
developer_portal/
├── docs/                          # Documentation content
│   ├── platform/                  # Platform documentation
│   │   ├── getting-started/       # Getting started guides
│   │   ├── horizon-core/          # Core platform docs
│   │   ├── firmware/              # Firmware development
│   │   ├── cloud/                 # Cloud platform
│   │   └── tools/                 # SDKs and tools
│   ├── hardware/                  # Hardware documentation
│   │   ├── catalog/               # Product catalog
│   │   ├── specs/                 # Technical specifications
│   │   ├── manufacturing/         # Manufacturing guides
│   │   └── integration/           # Integration guides
│   └── projects/                  # Projects and solutions
│       ├── conservation/          # Conservation applications
│       ├── maritime/              # Maritime solutions
│       ├── research/              # Research platforms
│       ├── case-studies/          # Case studies
│       └── templates/             # Solution templates
├── blog/                          # Blog posts
├── src/                           # Source code
│   ├── components/                # React components
│   ├── css/                       # Styling
│   └── pages/                     # Static pages
├── static/                        # Static assets
│   ├── img/                       # Images
│   └── assets/                    # Other assets
├── docusaurus.config.ts           # Docusaurus configuration
├── sidebars.ts                    # Sidebar configuration
└── package.json                   # Dependencies and scripts
```

## Information Architecture

The developer portal is organised around clear user journeys and content types:

### Primary Navigation
- **Platform**: Core technology documentation and technical guides
- **Hardware**: Product catalog, specifications, and integration guides
- **Quality**: Quality management system, procedures, and templates
- **Projects**: Real-world solutions, case studies, and implementations
- **Community**: Contributing guides, developer resources, and support
- **Resources**: Technical references, downloads, and learning materials
- **Blog**: News, updates, and announcements

### Content Organization
1. **Platform Documentation**: Technical deep-dives into Arribada technology
2. **Hardware Resources**: Everything needed to work with Arribada hardware
3. **Quality System**: Comprehensive quality management documentation
4. **Project Showcases**: Real deployments and success stories
5. **Community Hub**: How to contribute, get support, and collaborate
6. **Resource Library**: References, tools, and educational content

## Key Features

### Developer-Focused
- **Comprehensive API Documentation**: Complete platform API references
- **Code Examples**: Real-world implementation samples
- **Interactive Tutorials**: Step-by-step learning experiences
- **Development Tools**: SDKs, testing tools, and utilities

### Conservation-Focused
- **Project Showcases**: Wildlife tracking, marine monitoring, environmental research
- **Government Validation**: UK and EU government partnerships
- **Case Studies**: Detailed deployment reports and lessons learned
- **Impact Metrics**: Conservation outcomes and success stories

### Community-Driven
- **Open Source**: GitHub integration for collaborative development
- **Community Forum**: Technical discussions and support
- **Partner Program**: Commercial and academic partnerships
- **Events & Training**: Workshops, meetups, and certification

## Development

### Technologies Used
- **[Docusaurus](https://docusaurus.io/)**: Static site generator
- **React**: Component framework
- **TypeScript**: Type safety and better development experience
- **MDX**: Enhanced Markdown with React components
- **Algolia**: Search functionality

### Content Management
- **Markdown Files**: All documentation in version-controlled Markdown
- **React Components**: Custom components for enhanced content
- **Asset Management**: Images and media in static folder
- **Version Control**: Git-based workflow for content updates

### Styling & Theming
- **CSS Modules**: Scoped styling for components
- **Custom CSS**: Arribada brand colors and styling
- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode**: Automatic dark/light theme switching

## Contributing

### Documentation
- Fork the repository and create a feature branch
- Add or update Markdown files in the appropriate `docs/` subdirectory
- Follow the existing file naming and structure conventions
- Test locally before submitting pull request

### Code Changes
- Follow TypeScript and React best practices
- Maintain compatibility with Docusaurus architecture
- Add appropriate tests for new functionality
- Update documentation for any API changes

### Content Guidelines
- Use clear, concise language appropriate for technical audience
- Include code examples and practical implementation details
- Reference real Arribada projects and use cases where relevant
- Maintain consistency with existing documentation structure

## Deployment

### GitHub Pages
The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

```bash
# Manual deployment (if configured)
npm run deploy
```

### Custom Hosting
For custom hosting, build the site and serve the `build/` directory:

```bash
npm run build
# Serve build/ directory with your preferred web server
```

### Environment Configuration
- **Development**: `npm start` (hot reload enabled)
- **Production**: `npm run build` (optimised build)
- **Preview**: `npm run serve` (serve production build locally)

## Analytics & Monitoring

### Search Analytics
- **Algolia**: Search query analysis and optimisation
- **Popular Content**: Most-searched topics and pages
- **Search Success Rate**: Query completion and result relevance

### User Analytics
- **Google Analytics**: User behavior and engagement metrics
- **Page Performance**: Load times and core web vitals
- **Conversion Tracking**: Documentation to action conversion

### Content Performance
- **Popular Pages**: Most-visited documentation sections
- **User Pathways**: Common navigation patterns
- **Exit Points**: Where users leave the documentation

## Maintenance

### Regular Tasks
- **Content Updates**: Keep documentation current with platform changes
- **Link Checking**: Verify internal and external links
- **Performance Monitoring**: Site speed and user experience optimization
- **Security Updates**: Keep dependencies updated and secure

### Content Reviews
- **Quarterly Reviews**: Comprehensive content audit and updates
- **User Feedback**: Incorporate community feedback and suggestions
- **Analytics Review**: Update content strategy based on usage data
- **Technical Accuracy**: Verify code examples and technical details

## Support

### Community Support
- **Discord**: Real-time chat and community support
- **GitHub Issues**: Bug reports and feature requests
- **Community Forum**: Technical discussions and Q&A

### Professional Support
- **Technical Consulting**: Custom development and integration
- **Training Services**: On-site and remote training programs
- **Priority Support**: Commercial support agreements

## License

This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Arribada Team**: Platform development and technical content
- **Community Contributors**: Documentation improvements and translations
- **Conservation Partners**: Real-world use cases and project showcases
- **Docusaurus Team**: Excellent documentation platform and community support

---

**Questions or feedback?** Join our [Discord community](https://discord.gg/arribada) or [contact us directly](mailto:developers@arribada.org).