async function fetchArXivPapers(categories = ['cs.AI', 'cs.LG', 'stat.ML'], maxResults = 50) {
  try {
    const response = await fetch('/data/arxiv.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
    
    const papers = await response.json();
    cacheHasPapers(papers);
    return papers;
  } catch (error) {
    console.error('Failed to fetch papers:', error);
    return getCachedPapers();
  }
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
