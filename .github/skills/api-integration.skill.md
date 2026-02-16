---
type: skill
name: API Integration
description: >
  Handles integration with external APIs (arXiv) and manages data fetching,
  caching, and error handling.
---

# API Integration Skill

## ArXiv API Operations

### Query Construction
```
buildArXivQuery(keywords, maxResults, sortBy) -> string
- Build properly formatted arXiv search query
- Support multiple keyword combinations
- Handle special characters escaping
- Examples: "category:cs.AI AND submittedDate:[202601010000 TO 202612312359]"
```

### Data Fetching
```
fetchArXivPapers(query, retries) -> Array<Paper>
- Make HTTP request to arXiv API
- Handle pagination for large result sets
- Implement exponential backoff retry logic
- Parse XML/JSON response
- Handle API rate limits (3 requests/second recommended)
```

### Response Parsing
```
parseArXivResponse(rawResponse) -> Array<Paper>
- Extract paper metadata from API response
- Structure: { id, title, authors, summary, published, updated, pdfUrl }
- Validate required fields
- Clean up text (HTML entities, extra whitespace)
```

### Caching Strategy
```
getCachedPapers(cacheKey, maxAge) -> Array<Paper> | null
setCachedPapers(cacheKey, papers, ttl) -> void
- Store results with timestamp
- Invalidate old cache entries
- Reduce API calls and rate limiting issues
- Cache location: /data/cache/ or similar
```

### Error Handling
```
handleAPIError(error, retryCount) -> void
- Log errors with timestamps
- Implement fallback behavior (use cached data)
- Alert on persistent failures
- Graceful degradation if API unavailable
```

## Data Structures

```javascript
Paper {
  id: string,           // arXiv ID
  title: string,
  authors: Array<string>,
  summary: string,
  published: Date,
  updated: Date,
  categories: Array<string>,
  pdfUrl: string,
  pageUrl: string
}
```
