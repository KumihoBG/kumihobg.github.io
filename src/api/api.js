import { notify } from "../views/notification.js";

export const settings = {
    host: '',
};

export async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function getOptions(method = 'get', body) {
    const token = localStorage.getItem('authToken');

    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'uegeatzbbxvS84ZmnkwKVYMFKIp2s418DRhS60h',
            'X-Parse-REST-API-Key': 'fZI4Vw0r8BuGCZoCAQxBFAUGLemup4xiZDnA9a78',
            'X-Parse-Revocable-Session': '1',
            'X-Parse-Session-Token': token,
        }
    };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function getRequest(url) {
    return await request(url, getOptions());
}

export async function postRequest(url, data) {
    return await request(url, getOptions('post', data));
}

export async function putRequest(url, data) {
    return await request(url, getOptions('put', data));
}

export async function deleteRequest(url) {
    return await request(url, getOptions('delete'));
}

export async function login(username, password) {
    try {
        let user = await Parse.User.logIn(username, password);
        if (user.get('emailVerified')) {
            console.log('User logged in', user);
            const currentUser = Parse.User.current();
            const sessionToken = currentUser.getSessionToken();
            localStorage.setItem('username', username);
            localStorage.setItem('authToken', sessionToken);
            localStorage.setItem('userId', currentUser.id);
            notify(`You are logged in as: '${username}'`);
        }
    } catch (error) {
        Parse.User.logOut();
        console.log('User logged in. Please verify your email first');
        return notify(error);
    }
}

export async function register(username, email, password) {
    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
        let userResult = await user.signUp();
        Parse.User.logOut();
        const languageBtn = document.getElementById('language');
        const language = languageBtn.innerText;
        if (language === 'BG') {
            //Please check your email (...) to confirm your account.
            notify('Email must be verified. Please, visit your mail inbox for further instructions.');
        } else {
            notify('Електронният адрес трябва да бъде потвърден. Моля, посетете пощенската си кутия и следвайте инструкциите!');
        }
    } catch (error) {
        notify('Ops, something went wrong: ' + ' ' + error);
        console.error(error);
    }
}

export async function logout() {
    try {
        Parse.User.logOut();
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        notify('You have been logged out. Redirecting you to homepage...');
    } catch(error) {
        notify('Ops, something went wrong. Try again, please!');
        console.error(error);
    }
}

export async function passwordReset(email) {
    try {
        // Pass the username and password to logIn function
        let result = await Parse.User.requestPasswordReset(email);
        // Password reset request was sent successfully
        notify('Reset password email sent successfully');
      } catch (error) {
        console.error('Error while creating request to reset user password', error);
        notify('Error while creating request to reset user password', error);
      }
}