document.addEventListener('dblclick', function() {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        // Send selectedText to background script
        chrome.runtime.sendMessage({type: "textSelected", text: selectedText});
    }
});
