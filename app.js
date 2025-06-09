// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const pageContent = document.getElementById('pageContent');
const tocContainer = document.getElementById('tocContainer');
const tocContent = document.getElementById('tocContent');
const tocToggle = document.getElementById('tocToggle');
const searchInput = document.getElementById('searchInput');

// State
let currentPage = 'home';
let sidebarVisible = true;
let tocVisible = true;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSidebar();
    initializeTOC();
    initializeSearch();
    generateTOCForCurrentPage();
    
    // Check if screen is mobile on load
    checkMobileView();
});

// Window resize handler
window.addEventListener('resize', function() {
    checkMobileView();
});

// Check mobile view and adjust sidebar behavior
function checkMobileView() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebarVisible = false;
        sidebar.classList.add('hidden');
        sidebar.classList.remove('show');
        mainContent.classList.add('sidebar-hidden');
    } else {
        if (!sidebarVisible) {
            sidebarVisible = true;
            sidebar.classList.remove('hidden');
            mainContent.classList.remove('sidebar-hidden');
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const subItems = document.querySelectorAll('.sub-item[data-page]');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = item.getAttribute('data-page');
            navigateToPage(pageId);
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
    
    subItems.forEach(item => {
        const link = item.querySelector('.sub-link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = item.getAttribute('data-page');
            navigateToPage(pageId);
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
}

// Navigate to a specific page
function navigateToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page or fallback
    let targetPage = document.getElementById(`${pageId}-page`);
    if (!targetPage) {
        // For sub-pages that don't have their own page, show the parent page
        if (pageId.includes('-')) {
            const parentPageId = getParentPageId(pageId);
            targetPage = document.getElementById(`${parentPageId}-page`);
        } else {
            targetPage = document.getElementById('home-page');
        }
    }
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation state
    updateNavigationState(pageId);
    
    // Update current page
    currentPage = pageId;
    
    // Generate TOC for new page
    generateTOCForCurrentPage();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Get parent page ID for sub-pages
function getParentPageId(subPageId) {
    const subPageMappings = {
        'recent-materials': 'read',
        'tech-docs': 'read',
        'academic-papers': 'read',
        'industry-trends': 'read',
        'tech-analysis': 'describe',
        'research-reports': 'describe',
        'project-reviews': 'describe',
        'hj-folder': 'repository',
        'shared-materials': 'repository',
        'templates': 'repository'
    };
    
    return subPageMappings[subPageId] || 'home';
}

// Update navigation active state
function updateNavigationState(pageId) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current item
    const currentNavItem = document.querySelector(`[data-page="${pageId}"]`);
    if (currentNavItem) {
        currentNavItem.classList.add('active');
        
        // If it's a sub-item, also activate parent
        if (currentNavItem.classList.contains('sub-item')) {
            const parentNavItem = currentNavItem.closest('.nav-item');
            if (parentNavItem) {
                parentNavItem.classList.add('active');
            }
        }
    } else {
        // If exact match not found, try to find parent
        const parentPageId = getParentPageId(pageId);
        const parentNavItem = document.querySelector(`[data-page="${parentPageId}"]`);
        if (parentNavItem) {
            parentNavItem.classList.add('active');
        }
    }
}

// Sidebar functionality
function initializeSidebar() {
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) &&
            sidebar.classList.contains('show')) {
            toggleSidebar();
        }
    });
}

// Toggle sidebar visibility
function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebar.classList.toggle('show');
        sidebar.classList.toggle('hidden');
    } else {
        sidebarVisible = !sidebarVisible;
        sidebar.classList.toggle('hidden', !sidebarVisible);
        mainContent.classList.toggle('sidebar-hidden', !sidebarVisible);
    }
    
    // Animate hamburger menu
    animateHamburger();
}

// Animate hamburger menu
function animateHamburger() {
    const hamburgers = sidebarToggle.querySelectorAll('.hamburger');
    const isOpen = sidebar.classList.contains('show') || (!sidebar.classList.contains('hidden') && window.innerWidth > 768);
    
    if (isOpen) {
        hamburgers[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        hamburgers[0].style.transform = '';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = '';
    }
}

// Table of Contents functionality
function initializeTOC() {
    tocToggle.addEventListener('click', function() {
        tocVisible = !tocVisible;
        tocContent.style.display = tocVisible ? 'block' : 'none';
        tocToggle.textContent = tocVisible ? '−' : '+';
    });
}

// Generate TOC for current page
function generateTOCForCurrentPage() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;
    
    const headings = activePage.querySelectorAll('h2, h3, h4');
    
    if (headings.length === 0) {
        tocContainer.style.display = 'none';
        return;
    }
    
    tocContainer.style.display = 'block';
    
    let tocHTML = '<ul>';
    
    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent;
        
        // Ensure heading has an ID for smooth scrolling
        if (!heading.id) {
            heading.id = id;
        }
        
        const indent = (level - 2) * 15; // Indent based on heading level
        tocHTML += `<li style="margin-left: ${indent}px;">
            <a href="#${id}" onclick="scrollToHeading('${id}')">${text}</a>
        </li>`;
    });
    
    tocHTML += '</ul>';
    tocContent.innerHTML = tocHTML;
}

// Scroll to heading when TOC link is clicked
function scrollToHeading(headingId) {
    const heading = document.getElementById(headingId);
    if (heading) {
        const headerHeight = 60; // Height of fixed header
        const targetPosition = heading.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchButton = document.querySelector('.search-btn');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchButton.addEventListener('click', performSearch);
    
    // Simple autocomplete suggestions
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });
}

// Perform search (simulated)
function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    // Simulated search results
    const searchResults = getSearchResults(query);
    displaySearchResults(query, searchResults);
}

// Get simulated search results
function getSearchResults(query) {
    const searchData = [
        { title: '웹 개발 기초 가이드', page: 'read', type: 'Read 자료' },
        { title: 'JavaScript 최신 동향', page: 'read', type: 'Read 자료' },
        { title: '모던 웹 프레임워크 분석', page: 'describe', type: 'Describe 문서' },
        { title: 'Coffee_Gum 소개', page: 'home', type: '메인 페이지' },
        { title: 'Read 활동 가이드라인', page: 'read', type: '활동 안내' },
        { title: 'Describe 활동 목적', page: 'describe', type: '활동 안내' },
        { title: 'HJ 폴더', page: 'repository', type: 'Repository' }
    ];
    
    return searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
    );
}

// Display search results
function displaySearchResults(query, results) {
    // Create search results page content
    const searchResultsHTML = `
        <div class="page-header">
            <h1>검색 결과: "${query}"</h1>
            <div class="page-meta">
                <span class="last-updated">${results.length}개의 결과를 찾았습니다</span>
            </div>
        </div>
        <div class="page-body">
            ${results.length === 0 ? 
                '<p class="lead">검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>' :
                results.map(result => `
                    <div class="update-item">
                        <div class="update-meta">
                            <span class="update-category ${result.page}">${result.type}</span>
                        </div>
                        <h4><a href="#" onclick="navigateToPage('${result.page}')">${result.title}</a></h4>
                        <p class="update-author">페이지: ${getPageTitle(result.page)}</p>
                    </div>
                `).join('')
            }
        </div>
    `;
    
    // Hide all pages and show search results
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Create or update search results page
    let searchPage = document.getElementById('search-results-page');
    if (!searchPage) {
        searchPage = document.createElement('div');
        searchPage.id = 'search-results-page';
        searchPage.className = 'page';
        pageContent.appendChild(searchPage);
    }
    
    searchPage.innerHTML = searchResultsHTML;
    searchPage.classList.add('active');
    
    // Update navigation state
    updateNavigationState('search');
    currentPage = 'search';
    
    // Generate TOC for search results
    generateTOCForCurrentPage();
}

// Get page title for search results
function getPageTitle(pageId) {
    const pageTitles = {
        'home': '홈',
        'read': 'Read 활동',
        'describe': 'Describe 활동',
        'repository': 'Repository',
        'about': 'About'
    };
    
    return pageTitles[pageId] || '알 수 없음';
}

// Show search suggestions (simulated)
function showSearchSuggestions(query) {
    // This would be implemented with a dropdown in a real application
    // For this demo, we'll just update the placeholder
    const suggestions = ['웹 개발', 'JavaScript', '프레임워크', 'Coffee_Gum'];
    const matchingSuggestions = suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
    );
    
    if (matchingSuggestions.length > 0) {
        searchInput.title = `추천: ${matchingSuggestions.join(', ')}`;
    }
}

// Hide search suggestions
function hideSearchSuggestions() {
    searchInput.title = '';
}

// Utility function to expose scrollToHeading globally
window.scrollToHeading = scrollToHeading;
window.navigateToPage = navigateToPage;

// Add smooth scrolling behavior for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToHeading(targetId);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close sidebar on mobile
    if (e.key === 'Escape' && window.innerWidth <= 768 && sidebar.classList.contains('show')) {
        toggleSidebar();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add loading animation for page transitions
function showPageTransition() {
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// Add this to page navigation
const originalNavigateToPage = navigateToPage;
navigateToPage = function(pageId) {
    showPageTransition();
    setTimeout(() => {
        originalNavigateToPage(pageId);
    }, 50);
};

// Intersection Observer for TOC highlighting (advanced feature)
function initializeTOCHighlighting() {
    const headings = document.querySelectorAll('.page.active h2, .page.active h3, .page.active h4');
    
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const tocLink = tocContent.querySelector(`a[href="#${id}"]`);
            
            if (tocLink) {
                if (entry.isIntersecting) {
                    // Remove active class from all TOC links
                    tocContent.querySelectorAll('a').forEach(link => {
                        link.style.fontWeight = 'normal';
                        link.style.color = 'var(--color-text-secondary)';
                    });
                    
                    // Add active class to current TOC link
                    tocLink.style.fontWeight = 'bold';
                    tocLink.style.color = 'var(--color-primary)';
                }
            }
        });
    }, {
        rootMargin: '-60px 0px -70% 0px'
    });
    
    headings.forEach(heading => {
        observer.observe(heading);
    });
}

// Initialize TOC highlighting when page loads
setTimeout(initializeTOCHighlighting, 500);