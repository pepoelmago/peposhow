(function () {
    const script = document.currentScript;
    const origin = new URL(script.src).origin; // Auto-detect origin if hosted together, or hardcode

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';

    const iframe = document.createElement('iframe');
    iframe.src = origin + '/widget';
    iframe.style.width = '100%';
    iframe.style.height = '700px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';

    container.appendChild(iframe);
    script.parentNode.insertBefore(container, script);
})();
