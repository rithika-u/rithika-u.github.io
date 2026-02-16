class PapersPage {
  constructor() {
    this.allPapers = [];
    this.filteredPapers = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.selectedCategories = ['cs.AI', 'cs.LG', 'stat.ML'];
    this.searchTerm = '';
    this.sortBy = 'date-desc';
    
    this.init();
  }

  async init() {
    this.showLoading();
    let papers = await fetchArXivPapers(this.selectedCategories);
    
    // Convert published dates from strings to Date objects
    papers = papers.map(paper => ({
      ...paper,
      published: new Date(paper.published),
      abstract: paper.abstract || paper.summary || ''
    }));
    
    this.allPapers = papers;
    
    if (this.allPapers.length === 0) {
      this.showError();
      return;
    }
    
    this.setupEventListeners();
    this.updateLastUpdated();
    this.applyFiltersAndSort();
    this.render();
  }

  setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.currentPage = 1;
      this.applyFiltersAndSort();
      this.render();
    });

    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.selectedCategories = Array.from(
          document.querySelectorAll('.category-checkbox:checked')
        ).map(cb => cb.value);
        this.currentPage = 1;
        this.applyFiltersAndSort();
        this.render();
      });
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.currentPage = 1;
      this.applyFiltersAndSort();
      this.render();
    });

    document.getElementById('clearFilters').addEventListener('click', () => {
      this.resetFilters();
    });

    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
      this.resetFilters();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      const maxPage = Math.ceil(this.filteredPapers.length / this.itemsPerPage);
      if (this.currentPage < maxPage) {
        this.currentPage++;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  resetFilters() {
    document.getElementById('searchInput').value = '';
    this.searchTerm = '';
    
    document.querySelectorAll('.category-checkbox').forEach(cb => {
      cb.checked = ['cs.AI', 'cs.LG', 'stat.ML'].includes(cb.value);
    });
    this.selectedCategories = ['cs.AI', 'cs.LG', 'stat.ML'];
    
    document.getElementById('sortSelect').value = 'date-desc';
    this.sortBy = 'date-desc';
    
    this.currentPage = 1;
    this.applyFiltersAndSort();
    this.render();
  }

  applyFiltersAndSort() {
    this.filteredPapers = this.allPapers.filter(paper => {
      const matchesCategory = this.selectedCategories.length === 0 || 
                            this.selectedCategories.some(cat => paper.category.includes(cat));
      const matchesSearch = this.searchTerm === '' || 
                           paper.title.toLowerCase().includes(this.searchTerm) ||
                           paper.authors.some(a => a.toLowerCase().includes(this.searchTerm)) ||
                           paper.summary.toLowerCase().includes(this.searchTerm);
      return matchesCategory && matchesSearch;
    });

    this.sort();
  }

  sort() {
    switch (this.sortBy) {
      case 'date-asc':
        this.filteredPapers.sort((a, b) => a.published - b.published);
        break;
      case 'title':
        this.filteredPapers.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date-desc':
      default:
        this.filteredPapers.sort((a, b) => b.published - a.published);
    }
  }

  render() {
    const papersList = document.getElementById('papersList');
    const emptyState = document.getElementById('emptyState');
    const paginationContainer = document.getElementById('paginationContainer');

    if (this.filteredPapers.length === 0) {
      papersList.innerHTML = '';
      emptyState.style.display = 'block';
      paginationContainer.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const paginatedPapers = this.filteredPapers.slice(start, end);

    papersList.innerHTML = paginatedPapers.map(paper => this.createPaperCard(paper)).join('');

    this.renderPagination();
  }

  createPaperCard(paper) {
    const formattedDate = paper.published.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const abstract = paper.abstract.length > 300 
      ? paper.abstract.substring(0, 300) + '...' 
      : paper.abstract;

    const arXivUrl = paper.url || `https://arxiv.org/abs/${paper.id}`;
    const pdfUrl = paper.pdf_link || paper.pdfUrl || `https://arxiv.org/pdf/${paper.id}.pdf`;
    const paperId = paper.id || paper.title.substring(0, 10);

    return `
      <article class="paper-card" role="article" aria-labelledby="paper-${paperId}-title">
        <div class="paper-card__header">
          <h3 id="paper-${paperId}-title" class="paper-card__title">
            <a href="${arXivUrl}" target="_blank" rel="noopener noreferrer">
              ${this.escapeHtml(paper.title)}
            </a>
          </h3>
          <span class="paper-card__arxiv-id">${paperId}</span>
        </div>

        <div class="paper-card__metadata">
          <div class="paper-card__authors">
            <strong>Authors:</strong>
            <span>${this.escapeHtml(paper.authors.slice(0, 3).join(', '))}${paper.authors.length > 3 ? ' et al.' : ''}</span>
          </div>
          <div class="paper-card__date">
            <time datetime="${paper.published.toISOString()}">
              ${formattedDate}
            </time>
          </div>
        </div>

        <p class="paper-card__abstract">${this.escapeHtml(abstract)}</p>

        <div class="paper-card__actions">
          <a href="${pdfUrl}" class="btn btn-pdf" target="_blank" rel="noopener noreferrer">
            📄 View PDF
          </a>
          <a href="${arXivUrl}" class="btn btn-arxiv" target="_blank" rel="noopener noreferrer">
            🔗 View on arXiv
          </a>
        </div>
      </article>
    `;
  }

  renderPagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    const maxPage = Math.ceil(this.filteredPapers.length / this.itemsPerPage);

    if (maxPage <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'flex';
    document.getElementById('prevBtn').disabled = this.currentPage === 1;
    document.getElementById('nextBtn').disabled = this.currentPage === maxPage;
    document.getElementById('pageInfo').textContent = `Page ${this.currentPage} of ${maxPage}`;
  }

  updateLastUpdated() {
    const timestamp = getCacheTimestamp();
    if (timestamp) {
      const formatted = timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      document.getElementById('lastUpdate').textContent = formatted;
    } else {
      document.getElementById('lastUpdate').textContent = 'Just now';
    }
  }

  showLoading() {
    document.getElementById('loadingState').style.display = 'flex';
    document.getElementById('errorState').style.display = 'none';
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('papersList').innerHTML = '';
  }

  showError() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('papersList').innerHTML = '';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PapersPage();
});
