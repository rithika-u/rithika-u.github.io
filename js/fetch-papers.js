async function fetchArXivPapers(categories = ['cs.AI', 'cs.LG', 'stat.ML'], maxResults = 50) {
  const categoryQuery = categories.map(cat => `cat:${cat}`).join('+OR+');
  const url = `https://export.arxiv.org/api/query?search_query=${categoryQuery}&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const text = await response.text();
    return parseArXivResponse(text);
  } catch (error) {
    console.error('Failed to fetch papers from arXiv:', error);
    return getCachedPapers();
  }
}

function parseArXivResponse(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const entries = xmlDoc.querySelectorAll('entry');
  
  const papers = [];
  entries.forEach(entry => {
    const id = entry.querySelector('id').textContent.split('/abs/')[1];
    const title = entry.querySelector('title').textContent.replace(/\n/g, ' ').trim();
    
    const authors = [];
    entry.querySelectorAll('author').forEach(author => {
      authors.push(author.querySelector('name').textContent);
    });
    
    const summary = entry.querySelector('summary').textContent.replace(/\n/g, ' ').trim();
    const published = new Date(entry.querySelector('published').textContent);
    const category = entry.querySelector('arxiv\\:primary_category, primary_category')?.getAttribute('term') || 'General';
    
    papers.push({
      id,
      title,
      authors,
      summary,
      published,
      category,
      url: `https://arxiv.org/abs/${id}`,
      pdfUrl: `https://arxiv.org/pdf/${id}.pdf`,
    });
  });
  
  cacheHasPapers(papers);
  return papers;
}

function cacheHasPapers(papers) {
  const cacheData = {
    papers,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('arxivCache', JSON.stringify(cacheData));
}

function getCachedPapers() {
  const cached = localStorage.getItem('arxivCache');
  if (cached) {
    try {
      return JSON.parse(cached).papers || [];
    } catch (e) {
      console.error('Failed to parse cache:', e);
    }
  }
  return [];
}

function isCacheStale() {
  const cached = localStorage.getItem('arxivCache');
  if (!cached) return true;
  
  try {
    const data = JSON.parse(cached);
    const cacheAge = Date.now() - new Date(data.timestamp).getTime();
    return cacheAge > 3600000;
  } catch (e) {
    return true;
  }
}

function getCacheTimestamp() {
  const cached = localStorage.getItem('arxivCache');
  if (!cached) return null;
  
  try {
    const data = JSON.parse(cached);
    return new Date(data.timestamp);
  } catch (e) {
    return null;
  }
}
