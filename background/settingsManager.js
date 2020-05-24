const DEFAULT_SETTINGS = {
    automatedLoginEnabled: true,
    automatedRefreshEnabled: false
}

/**
 * Verifies settings that are not set in storage and initializes them to their default value.
 */
const setNewSettingsToDefaults = () => {
    chrome.storage.local.get(Object.keys(DEFAULT_SETTINGS), (storage) => {
        chrome.storage.local.set({...DEFAULT_SETTINGS, ...storage});
    });
}

chrome.runtime.onInstalled.addListener(setNewSettingsToDefaults);
