// Fix paths for GitHub Pages subdirectory deployment
(function() {
    // Get the current page path
    var currentPath = window.location.pathname;

    // Determine if we're in a subdirectory
    var isInSubdir = currentPath.includes('/about/') ||
                     currentPath.includes('/education/') ||
                     currentPath.includes('/news/') ||
                     currentPath.includes('/press/') ||
                     currentPath.includes('/web/');

    // Set the base path prefix
    var pathPrefix = isInSubdir ? '../' : '';

    // Wait for DOM to be ready
    function fixPaths() {
        // Fix all navigation home links
        document.querySelectorAll('a[href*="index"]').forEach(function(link) {
            if (!link.href.includes('http') && !link.href.includes('../')) {
                link.href = pathPrefix + 'index.html';
            }
        });

        // Fix navigation links to root-level pages
        ['swf', 'research', 'extension', 'education', 'outputs', 'press', 'funding', 'survey'].forEach(function(page) {
            document.querySelectorAll('a[href*="' + page + '"]').forEach(function(link) {
                // Only fix if it doesn't already have the correct path
                if (!link.href.includes('http') && !link.href.includes('../') && !link.href.includes('about/')) {
                    link.href = pathPrefix + page + '.html';
                }
            });
        });

        // Fix navigation links to about pages
        document.querySelectorAll('a[href*="about/"]').forEach(function(link) {
            var filename = link.href.split('/').pop();
            if (!link.href.includes('http') && !link.href.includes('../')) {
                link.href = pathPrefix + 'about/' + filename;
            }
        });

        // Fix logo image
        var logo = document.querySelector('img[src*="UCM_SWFlogo"]');
        if (logo && !logo.src.includes('http')) {
            logo.src = pathPrefix + 'images/UCM_SWFlogo_CLR.png';
        }

        // Fix footer banner image
        var footerImg = document.querySelector('img[src*="SWF_Partners_Banner"]');
        if (footerImg && !footerImg.src.includes('http')) {
            footerImg.src = pathPrefix + 'images/SWF_Partners_Banner.png';
        }

        // Fix script src for main.js in nav
        var scripts = document.querySelectorAll('script[src*="main.js"]');
        scripts.forEach(function(script) {
            if (!script.src.includes('http') && !script.src.includes('../')) {
                // Can't change script src after load, but note for future
                console.log('Script path would need adjustment: ' + script.src);
            }
        });
    }

    // Run immediately
    fixPaths();

    // Also run after a short delay to catch dynamically loaded content
    setTimeout(fixPaths, 100);

    // Export for use by other scripts
    window.fixPaths = fixPaths;
})();