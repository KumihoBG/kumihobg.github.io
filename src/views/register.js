import { html } from 'https://unpkg.com/lit-html?module';
import { toggleEye } from "../../index.js";
import { validateInput } from '../../services/validator.js';
import { navTemplate, setUserNav } from "./navigation.js";

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
                        <input name="email" type="email" autocomplete="email" required pattern="[^]+@[^]+[.][a-z]{2,63}$"><br>
                    </div>
                    <p id="register-info"><i class="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
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
        <div id="register-image">
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
        let username = formData.get('username').toString().trim();
        let email = formData.get('email').toString().trim();
        let password = formData.get('password').trim();
        let repass = formData.get('repeatPass').trim();

        validateInput(username, email, password, repass);
    }
}

