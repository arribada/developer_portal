#!/bin/bash

# Install Mermaid plugin for Docusaurus
echo "Installing @docusaurus/theme-mermaid..."

cd /Users/jason/projects/arribada-analysis/developer_portal

# Install the Mermaid theme
npm install --save @docusaurus/theme-mermaid

echo ""
echo "✅ Mermaid plugin installed!"
echo ""
echo "Now you need to update your docusaurus.config.ts file."
echo "Add the following to your config:"
echo ""
echo "1. In the top imports, add:"
echo "   import {themes as prismThemes} from 'prism-react-renderer';"
echo ""
echo "2. In the config object, add markdown configuration:"
echo "   markdown: {"
echo "     mermaid: true,"
echo "   },"
echo ""
echo "3. In the themes array (after presets), add:"
echo "   themes: ['@docusaurus/theme-mermaid'],"
echo ""
echo "4. Optionally, configure Mermaid theme in themeConfig:"
echo "   mermaid: {"
echo "     theme: {light: 'neutral', dark: 'dark'},"
echo "   },"
