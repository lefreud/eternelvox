document.addEventListener('DOMContentLoaded', function () {
    const automatedLoginCheckbox = document.getElementById('automated-login-checkbox');
    const automatedRefreshCheckbox = document.getElementById('automated-refresh-checkbox');

    // Set current checkboxes state
    chrome.storage.local.get(['automatedLoginEnabled', 'automatedRefreshEnabled'], (storage) => {
        automatedLoginCheckbox.checked = storage.automatedLoginEnabled === true;
        automatedRefreshCheckbox.checked = storage.automatedRefreshEnabled === true;
    });

    automatedLoginCheckbox.addEventListener('click', () => {
            chrome.storage.local.set({automatedLoginEnabled: automatedLoginCheckbox.checked});
            if (!automatedLoginCheckbox.checked) {
                chrome.storage.local.remove('loginCredentials');
            }
        }
    );
    automatedRefreshCheckbox.addEventListener('click', () => {
        chrome.storage.local.set({automatedRefreshEnabled: automatedRefreshCheckbox.checked});
    })
});
