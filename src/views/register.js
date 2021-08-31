import { html } from 'https://unpkg.com/lit-html?module';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { register } from "../api/data.js";
import { toggleEye } from "../../index.js";
import { navTemplate, setUserNav } from "./navigation.js";
import { notify } from "./notification.js";

const registerTemplate = (onSubmit) => html`
    ${navTemplate()}
    <section id="register-section">
        <div id="register-container">
            <div id="form-container">
                <form @submit=${onSubmit} id="register-form" action="#" method="post">
                    <h1>Register</h1>
                    <p>Please enter your credentials.</p>
                    <label for="username">Username</label><br>
                    <div class="icon">
                        <i class="fas fa-user"></i>
                        <input name="username" type="text" autocomplete="username"><br>
                    </div>
                    <label for="email">Email</label><br>
                    <div class="icon">
                        <i class="fas fa-envelope-open-text"></i>
                        <input name="email" type="email" autocomplete="email"><br>
                    </div>
                    <label for="password">Password</label><br>
                    <div class="icon">
                        <i class="fas fa-lock"></i>
                        <input id="password" type="password" autocomplete="current-password" name="password">
                        <i id="eye-one" class="fas fa-eye" class="togglePassword"></i>
                        <br>
                    </div>
                    <label for="repeatPass">Repeat password</label><br>
                    <div class="icon">
                        <i class="fas fa-lock"></i>
                        <input id="repeatPass" type="password" autocomplete="current-password" name="repeatPass"><br>
                        <i id="eye-two" class="fas fa-eye"></i>
                    </div>
                    <div>
                        <button type="submit" class="registerBtn">Register</button>
                    </div>
                </form>
                <div class="second">
                    <a class="link" href="/login">Already have an account?</a>
                </div>
            </div>
        </div>
        <div id="login-image">
            <img src="../images/deer2.png">
        </div>
    </section>`;

export async function registerPage(context) {
    context.render(registerTemplate(onSubmit));
    setUserNav();
    toggleEye();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').toString();
        const email = formData.get('email').toString();
        const password = formData.get('password');
        const repass = formData.get('repeatPass');

        if (username === '' || username === null || email === '' || email === null || password === '' || password === null || repass === null || repass === '') {
            notify('All fields are required!');
            return;
        }

        if (username === 'admin') {
            return notify('Username cannot be "admin"');
        }

        if (password === 'password') {
            return notify('Password must be different!')
        }

        if (password !== repass) {
            notify('Two passwords don\'t match!');
            return;
        }

        if (typeof username !== 'string' || !username instanceof String) {
            return;
        }

        let chars = password.toString().split("");
        let digits = 0;
        let isValid = false;
        let isInvSymbol = false;
        let hasDigits = false;

        // Checks if the char is a num and if it has 2 digits at least
        for (let i = 0; i < chars.length; i++) {
            let current = Number(chars[i]);
            if (Number.isInteger(current)) {
                digits++;
                if (digits >= 2) {
                    hasDigits = true;
                }
            }
        }

        // Checks if a char is letter or digit only
        for (let j = 0; j < chars.length; j++) {
            let currChar = chars[j];
            if ((currChar.charCodeAt() >= 48 && currChar.charCodeAt() <= 57) || (currChar.charCodeAt() >= 65 && currChar.charCodeAt() <= 90) || (currChar.charCodeAt() >= 97 && currChar.charCodeAt() <= 122)) {
                isInvSymbol = false;
            } else {
                isInvSymbol = true;
                break;
            }
        }

        if (password.length < 6 || password.length > 10) {
            isValid = false;
        } else {
            isValid = true;
        }

        if (isValid == false) {
            return notify('Password must be between 6 and 10 characters. ');
        }

        if (isInvSymbol == true) {
            return notify('Password must consist only of letters and digits. ');
        }

        if (hasDigits == false) {
            return notify('Password must have at least 2 digits. ');
        }

        const dirty = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" /> <script>alert('you got hacked!')</script>`
        const windowEmulator = new JSDOM('').window;
        const DOMPurify = createDOMPurify(windowEmulator);

        if (DOMPurify.isSupported) {
            const cleanUsername = DOMPurify.sanitize(username);
            const cleanEmail = DOMPurify.sanitize(email);
            const cleanPassword = DOMPurify.sanitize(password);
            await register(cleanUsername, cleanEmail, cleanPassword);
            context.page.redirect('/login');
        }
    }
}

