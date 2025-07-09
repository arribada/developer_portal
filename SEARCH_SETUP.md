# Setting Up Algolia Search

Algolia search is mentioned in the README but currently commented out in the configuration. Here's how to activate it:

## 1. Create an Algolia Account

1. Go to [Algolia](https://www.algolia.com/)
2. Sign up for a free account (Community plan is free for open source projects)
3. Create a new application

## 2. Configure DocSearch

For open source documentation, you can apply for free DocSearch:

1. Go to [DocSearch](https://docsearch.algolia.com/)
2. Apply for the free DocSearch program
3. Provide your documentation URL: https://developers.arribada.org
4. Wait for approval (usually 1-2 weeks)

## 3. Manual Setup (Immediate)

If you need search immediately, you can set up Algolia manually:

### Create an Index
1. In Algolia dashboard, create a new index called `arribada-dev-portal`
2. Note your:
   - Application ID
   - Search-Only API Key (public)
   - Admin API Key (keep secret)

### Update Docusaurus Config

Update `docusaurus.config.ts`:

```typescript
algolia: {
  appId: 'YOUR_APPLICATION_ID',
  apiKey: 'YOUR_SEARCH_ONLY_API_KEY', // Public API key
  indexName: 'arribada-dev-portal',
  contextualSearch: true,
  searchPagePath: 'search',
  // Optional: see Algolia docs
  searchParameters: {},
},
```

### Create Crawler Configuration

Create `.github/algolia/config.json`:

```json
{
  "index_name": "arribada-dev-portal",
  "start_urls": [
    "https://developers.arribada.org/"
  ],
  "sitemap_urls": [
    "https://developers.arribada.org/sitemap.xml"
  ],
  "stop_urls": [],
  "selectors": {
    "lvl0": {
      "selector": "(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]",
      "type": "xpath",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "header h1, article h1",
    "lvl2": "article h2",
    "lvl3": "article h3",
    "lvl4": "article h4",
    "lvl5": "article h5, article td:first-child",
    "lvl6": "article h6",
    "text": "article p, article li, article td:last-child"
  },
  "custom_settings": {
    "separatorsToIndex": "_",
    "attributesForFaceting": [
      "language",
      "version",
      "type",
      "docusaurus_tag"
    ],
    "attributesToRetrieve": [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type"
    ]
  }
}
```

### Set up GitHub Action for Crawling

Create `.github/workflows/algolia-crawler.yml`:

```yaml
name: Algolia Crawler

on:
  push:
    branches:
      - main
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'

jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Get config
        id: algolia_config
        run: echo "::set-output name=config::$(cat .github/algolia/config.json | jq -r tostring)"
      
      - name: Run Algolia Crawler
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.ALGOLIA_APP_ID }}
          API_KEY: ${{ secrets.ALGOLIA_ADMIN_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
```

### Add Secrets to GitHub

In your GitHub repository settings:
1. Go to Settings > Secrets and variables > Actions
2. Add:
   - `ALGOLIA_APP_ID`: Your Algolia Application ID
   - `ALGOLIA_ADMIN_KEY`: Your Algolia Admin API Key

## 4. Alternative: Local Search

If you prefer not to use Algolia, you can use the local search plugin:

```bash
npm install @easyops-cn/docusaurus-search-local
```

Then update `docusaurus.config.ts`:

```typescript
themes: [
  [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    {
      hashed: true,
      language: ["en"],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    },
  ],
],
```

## Recommendation

For the Arribada developer portal, I recommend:

1. **Apply for DocSearch** - It's free for open source and well-integrated with Docusaurus
2. **Use local search as temporary solution** - Implement it now while waiting for DocSearch approval
3. **Document the search setup** - Add instructions to your contributing guide

Would you like me to implement the local search option as a temporary solution while you apply for DocSearch?
