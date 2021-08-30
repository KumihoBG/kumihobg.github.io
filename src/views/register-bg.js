import {html} from 'https://unpkg.com/lit-html?module';
import { register } from "../api/data.js";
import { toggleEye } from "../../index.js";
import { navTemplateBg, setUserNav } from "./navigation.js";
import { notify } from "./notification.js";

const registerTemplateBg = (onSubmit) => html`
    ${navTemplateBg()}
    <section id="register-section">
        <div id="register-container">
            <div id="form-container">
                <form @submit=${onSubmit} id="register-form" action="#" method="post">
                    <h1>Регистрация</h1>
                    <p>Моля, въведете вашите идентификационни данни.</p>
                    <label for="username">Потребителско име</label><br>
                    <div class="icon">
                        <i class="fas fa-user"></i>
                        <input name="username" type="text" autocomplete="username"><br>
                    </div>
                    <label for="email">Email</label><br>
                    <div class="icon">
                        <i class="fas fa-envelope-open-text"></i>
                        <input name="email" type="email" autocomplete="current-email"><br>
                    </div>
                    <label for="password">Парола</label><br>
                    <div class="icon">
                        <i class="fas fa-lock"></i>
                        <input id="password" type="password" autocomplete="current-password" name="password"><i id="eye-one"
                            class="fas fa-eye" class="togglePassword"></i>
                        <br>
                    </div>
                    <label for="repeatPass">Повторете Вашата парола</label><br>
                    <div class="icon">
                        <i class="fas fa-lock"></i>
                        <input id="repeatPass" type="password" autocomplete="current-password" name="repeatPass"><i
                            id="eye-two" class="fas fa-eye" class="togglePassword"></i>
                        <br>
                    </div>
                    <div>
                        <button type="submit" class="registerBtn">Регистрация</button>
                    </div>
                </form>
                <div class="second">
                    <a class="link" href="/login-bg">Вече имате създаден профил?</a>
                </div>
            </div>
        </div>
        <div id="login-image">
            <img src="../images/deer-bg.png">
        </div>
    </section>`;

export async function registerPageBg(context) {
    context.render(registerTemplateBg(onSubmit));
    setUserNav();
    toggleEye();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('repeatPass');

        if (username == '' || email == '' || password == '' || repass == '') {
            notify('Попълването на всички полета е задължително!');
            return;
        }

        if (password !== repass) {
            notify('Двете пароли не съвпадат!');
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
            return notify('Паролата трябва да бъде с дължина между 6 и 10 символа. ');
        }

        if (isInvSymbol == true) {
            return notify('Паролата може да съдържа само букви и цифри. ');
        }

        if (hasDigits == false) {
            return notify('Паролата трябва да съдържа поне 2 цифри. ');
        }
        await register(username, email, password);
        context.page.redirect('/login');
    }
}