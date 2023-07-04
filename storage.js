```javascript
let storedHostnames = [];
let isPaused = false;

// Function to get stored hostnames
function getStoredHostnames() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('storedHostnames', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                storedHostnames = result.storedHostnames || [];
                resolve(storedHostnames);
            }
        });
    });
}

// Function to store hostname
function storeHostname(hostname) {
    return new Promise((resolve, reject) => {
        if (!storedHostnames.includes(hostname)) {
            storedHostnames.push(hostname);
            chrome.storage.sync.set({ 'storedHostnames': storedHostnames }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}

// Function to clear stored hostnames
function clearStoredHostnames() {
    return new Promise((resolve, reject) => {
        storedHostnames = [];
        chrome.storage.sync.set({ 'storedHostnames': storedHostnames }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

// Function to get pause status
function getPauseStatus() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('isPaused', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                isPaused = result.isPaused || false;
                resolve(isPaused);
            }
        });
    });
}

// Function to set pause status
function setPauseStatus(status) {
    return new Promise((resolve, reject) => {
        isPaused = status;
        chrome.storage.sync.set({ 'isPaused': isPaused }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

export { getStoredHostnames, storeHostname, clearStoredHostnames, getPauseStatus, setPauseStatus };
```