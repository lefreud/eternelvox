chrome.alarms.create('refreshTabs', {
    'periodInMinutes': 55
});

// Add blacklisted URLs that won't be auto-refreshed
const BLACKLISTED_URL_FORMATS = [
    /^http[s]?:\/\/climoilou\.omnivox\.ca\/WebApplication\/Module\.MIOE.*$/
];

chrome.alarms.onAlarm.addListener(alarm => {
    console.log('EternelVox alarm triggered at ' + Date().toLocaleString());
    chrome.storage.local.get(['automatedRefreshEnabled'], (storage) => {
        if (storage.automatedRefreshEnabled === true) {
            chrome.tabs.query({
                url: ["https://*.omnivox.ca/*"]
            }, (tabs) => {
                tabs.forEach((tab) => {
                    let blacklistedUrl = false;
                    for (let i = 0; i < BLACKLISTED_URL_FORMATS.length; i++) {
                        if (tab.url.match(BLACKLISTED_URL_FORMATS[i])) {
                            blacklistedUrl = true;
                            break;
                        }
                    }
                    if (!blacklistedUrl) {
                        chrome.tabs.executeScript(tab.id, {
                            code: "location.reload();"
                        });
                    }
                });
            })
        }
    });
});

