document.addEventListener('DOMContentLoaded', function () {
    const automatedCheckbox = document.getElementById('automated-login-checkbox');

    // Set current checkboxes state
    chrome.storage.local.get(['automatedLoginEnabled'], (storage) => {
        if (storage.automatedLoginEnabled === true) {
            automatedCheckbox.checked = true;
        }
    });

    automatedCheckbox.addEventListener('click', () => {
            chrome.storage.local.set({automatedLoginEnabled: automatedCheckbox.checked});
            if (!automatedCheckbox.checked) {
                chrome.storage.local.remove('loginCredentials');
            }
        }
    );
});
