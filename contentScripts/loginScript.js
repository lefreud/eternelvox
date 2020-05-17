const INPUT_DELAY = 80;

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));


window.onload = async () => {

    /*
     * LOGIN FORM ELEMENTS
     */
    const form = document.querySelector("form#formLogin");
    const userTypeButtons = {
        Etudiant: document.querySelector("a[data-type-utilisateur='Etudiant']"),
        EmployeNormal: document.querySelector("a[data-type-utilisateur='EmployeNormal']")
    }
    const userTypeHiddenInput = document.querySelector("input[type='hidden'][name='TypeIdentification']");

    // Login fields can only be queried when the right user type is selected
    const loginFields = {
        Etudiant: {
            usernameInput: () => document.querySelector("input[type='text'][name='NoDA']"),
            passwordInput: () => document.querySelector("input[type='password'][name='PasswordEtu']")
        },
        EmployeNormal: {
            usernameInput: () => document.querySelector("input[type='text'][name='NoEmplEmployeNormal']"),
            passwordInput: () => document.querySelector("input[type='password'][name='PasswordEmplEmployeNormal']")
        }
    }
    const submitBtn = document.querySelector("form#formLogin button[type='submit']");

    /*
     * Login execution logic
     */
    chrome.storage.local.get(["loginCredentials", "automatedLoginEnabled"], async (result) => {
        if (result.hasOwnProperty('automatedLoginEnabled') && result.automatedLoginEnabled === true) {
            if (result.hasOwnProperty('loginCredentials')) {
                const {userType, username, password} = result.loginCredentials;
                await sleep(INPUT_DELAY);
                userTypeButtons[userType].click()
                await sleep(INPUT_DELAY);
                loginFields[userType].usernameInput().value = username;
                await sleep(INPUT_DELAY);
                loginFields[userType].passwordInput().value = password;
                await sleep(INPUT_DELAY);
                submitBtn.click();
            } else {
                form.onsubmit = (event) => {
                    const userType = userTypeHiddenInput.value;
                    chrome.storage.local.set({
                        loginCredentials: {
                            username: loginFields[userType].usernameInput().value,
                            password: loginFields[userType].passwordInput().value,
                            userType: userType
                        }
                    }, () => {
                        form.submit();
                    });
                    return false;
                }
            }
        }
    });
};
