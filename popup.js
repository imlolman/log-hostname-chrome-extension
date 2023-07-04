```javascript
document.addEventListener('DOMContentLoaded', function() {
    let sendUrlInput = document.getElementById('sendUrlInput');
    let clearHostnamesButton = document.getElementById('clearHostnamesButton');
    let pauseSendingButton = document.getElementById('pauseSendingButton');

    // Load the stored sendUrl
    chrome.storage.sync.get('sendUrl', function(data) {
        sendUrlInput.value = data.sendUrl || '';
    });

    // Save the sendUrl when it changes
    sendUrlInput.addEventListener('change', function() {
        chrome.storage.sync.set({sendUrl: this.value});
    });

    // Clear stored hostnames
    clearHostnamesButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: 'clearHostnames'});
    });

    // Pause or resume sending
    pauseSendingButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: 'pauseSending'});
    });
});
```