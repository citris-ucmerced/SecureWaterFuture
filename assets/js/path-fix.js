// Fix paths for GitHub Pages subdirectory deployment
(function() {
    // Get the current page path
    var currentPath = window.location.pathname;
    var pathDepth = currentPath.split('/').filter(function(p) { return p; }).length - 1;

    // Determine base path based on depth
    var basePath = '';
    if (pathDepth > 1) {
        // We're in a subdirectory
        basePath = '../';
    }

    // Fix navigation links
    document.querySelectorAll('.nav-home').forEach(function(link) {
        if (link.href) link.href = basePath + 'index.html';
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        if (link.href) {
            var filename = link.href.split('/').pop();
            link.href = basePath + filename;
        }
    });

    document.querySelectorAll('.nav-sublink').forEach(function(link) {
        if (link.href) {
            var parts = link.href.split('/');
            var folder = parts[parts.length - 2];
            var filename = parts[parts.length - 1];
            link.href = basePath + folder + '/' + filename;
        }
    });

    // Fix logo image
    document.querySelectorAll('.nav-logo').forEach(function(img) {
        img.src = basePath + 'images/UCM_SWFlogo_CLR.png';
    });

    // Fix footer image
    document.querySelectorAll('.footer-img').forEach(function(img) {
        img.src = basePath + 'images/SWF_Partners_Banner.png';
    });

    // Fix nav script
    document.querySelectorAll('.nav-script').forEach(function(script) {
        // Scripts can't be updated after load, but we note this for future reference
    });
})();