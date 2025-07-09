#!/bin/bash

# Install local search plugin
npm install --save @easyops-cn/docusaurus-search-local

echo "Local search plugin installed. Now update docusaurus.config.ts with:"
echo ""
echo "themes: ["
echo "  ["
echo "    require.resolve('@easyops-cn/docusaurus-search-local'),"
echo "    {"
echo "      hashed: true,"
echo "      language: ['en'],"
echo "      highlightSearchTermsOnTargetPage: true,"
echo "      explicitSearchResultPath: true,"
echo "    },"
echo "  ],"
echo "],"
