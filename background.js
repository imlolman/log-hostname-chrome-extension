```javascript
let sendUrl = '';
let storedHostnames = [];
let isPaused = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ storedHostnames: [] });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const hostname = getHostname(changeInfo.url);
    if (!isPaused && !storedHostnames.includes(hostname)) {
      sendHostname(hostname);
      storeHostname(hostname);
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'sendHostname') {
    sendUrl = request.sendUrl;
  } else if (request.message === 'clearHostnames') {
    clearStoredHostnames();
  } else if (request.message === 'pauseSending') {
    isPaused = !isPaused;
  }
});

function getHostname(url) {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

function sendHostname(hostname) {
  fetch(sendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hostname }),
  });
}

function storeHostname(hostname) {
  storedHostnames.push(hostname);
  chrome.storage.sync.set({ storedHostnames });
}

function clearStoredHostnames() {
  storedHostnames = [];
  chrome.storage.sync.set({ storedHostnames });
}
```