```javascript
// Importing shared dependencies
import { sendUrl, storedHostnames, isPaused } from './storage.js';

// DOM Elements
const sendUrlInput = document.getElementById('sendUrlInput');
const clearHostnamesButton = document.getElementById('clearHostnamesButton');
const pauseSendingButton = document.getElementById('pauseSendingButton');

// Load the current settings from storage
chrome.storage.sync.get(['sendUrl', 'isPaused'], function(data) {
  sendUrlInput.value = data.sendUrl || '';
  pauseSendingButton.checked = data.isPaused || false;
});

// Save the settings to storage when they are changed
sendUrlInput.addEventListener('change', function() {
  chrome.storage.sync.set({ sendUrl: this.value });
});

pauseSendingButton.addEventListener('change', function() {
  chrome.storage.sync.set({ isPaused: this.checked });
});

// Clear stored hostnames when the button is clicked
clearHostnamesButton.addEventListener('click', function() {
  chrome.storage.sync.set({ storedHostnames: [] });
});
```