// Enhanced 404 tracking script
// Add this to Google Tag Manager or directly in your site

window.addEventListener('load', function() {
  // Track 404 errors with detailed context
  if (window.location.pathname.includes('404') || document.title.includes('404')) {
    gtag('event', 'page_not_found_detailed', {
      event_category: 'Navigation Error',
      event_label: window.location.pathname,
      custom_map: {
        'custom_parameter_1': 'broken_url',
        'custom_parameter_2': 'referrer_source',
        'custom_parameter_3': 'user_journey'
      },
      broken_url: window.location.href,
      referrer_source: document.referrer || 'direct_access',
      user_journey: sessionStorage.getItem('page_history') || 'unknown',
      search_query: new URLSearchParams(window.location.search).get('q') || 'none',
      timestamp: new Date().toISOString()
    });
  }
});

// Track page navigation history for better 404 debugging
(function() {
  let pageHistory = JSON.parse(sessionStorage.getItem('page_history') || '[]');
  pageHistory.push({
    url: window.location.href,
    timestamp: new Date().toISOString(),
    referrer: document.referrer
  });

  // Keep only last 5 pages
  if (pageHistory.length > 5) {
    pageHistory = pageHistory.slice(-5);
  }

  sessionStorage.setItem('page_history', JSON.stringify(pageHistory));
})();