(function () {
  var scrollDepths = [25, 50, 75, 95];
  var trackedDepths = {};
  var currentPath = document.location.pathname;
  var debounceTimer;
  var eventCount = 0;
  var maxEventsPerPath = 4;
  var fullScrolled = false;

  function hasDepthBeenTracked(depth) {
    return window.dataLayer.some(function (data) {
      return (
        data.event === 'scroll_depth_tracking' && data.scroll_depth === depth && data.page_location === currentPath
      );
    });
  }

  function trackScrollDepth() {
    var newPath = document.location.pathname;
    if (newPath !== currentPath) {
      trackedDepths = {};
      currentPath = newPath;
      eventCount = 0;
      fullScrolled = false;
    }

    if (eventCount >= maxEventsPerPath || fullScrolled) {
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      try {
        var scrollPercentage = ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
        scrollDepths.forEach(function (depth) {
          if (scrollPercentage >= depth && !trackedDepths[depth] && !hasDepthBeenTracked(depth)) {
            trackedDepths[depth] = true;
            eventCount++;
            if (depth === 95) {
              fullScrolled = true;
            }
            sendDataToGA4(depth, newPath, fullScrolled);
          }
        });
      } catch (error) {
        console.error('Error tracking scroll depth: ', error);
      }
    }, 2000);
  }

  function sendDataToGA4(depth, pagePath, fullScrolledFlag) {
    window.dataLayer.push({
      event: 'scroll_depth_tracking',
      scroll_depth: depth,
      page_location: pagePath,
      full_scrolled: fullScrolledFlag,
    });
  }

  if (document.readyState === 'complete') {
    window.addEventListener('scroll', trackScrollDepth);
  } else {
    window.addEventListener('DOMContentLoaded', function () {
      window.addEventListener('scroll', trackScrollDepth);
    });
  }

  window.addEventListener('popstate', function () {
    trackedDepths = {};
    currentPath = document.location.pathname;
    eventCount = 0;
    fullScrolled = false;
  });
  window.addEventListener('pushState', function () {
    trackedDepths = {};
    currentPath = document.location.pathname;
    eventCount = 0;
    fullScrolled = false;
  });
  window.addEventListener('replaceState', function () {
    trackedDepths = {};
    currentPath = document.location.pathname;
    eventCount = 0;
    fullScrolled = false;
  });
})();
