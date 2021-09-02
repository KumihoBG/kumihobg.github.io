import {html} from 'https://unpkg.com/lit-html?module';
import { toggleEye } from "../../index.js";
import { validateBgInput } from '../../services/validator.js';
import { navTemplateBg, setUserNav } from "./navigation.js";

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
                        <input name="email" type="email" autocomplete="current-email" required pattern="[^]+@[^]+[.][a-z]{2,63}$"><br>
                    </div>
                    <p id="register-info"><i class="fas fa-info-circle"></i> Паролата трябва да бъде между 6 и 10 знака. Паролата Ви може да съдържа само букви и поне 2 цифри.</p>
                    <label for="password">Парола</label><br>
                    <div class="icon">
                        <i class="fas fa-lock"></i>
                        <input id="password" type="password" autocomplete="current-password" name="password">
                        <i id="eye-one" class="fas fa-eye" class="togglePassword"></i>
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
        let username = formData.get('username').toString().trim();
        let email = formData.get('email').toString().trim();
        let password = formData.get('password').trim();
        let repass = formData.get('repeatPass').trim();
        validateBgInput(username, email, password, repass);
    }
}