import { html } from 'https://unpkg.com/lit-html?module';
import { toggleEye } from '../../index.js';
import { login } from "../api/data.js";
import { navTemplate, setUserNav } from "./navigation.js";
import { notify } from "./notification.js";


const loginTemplate = (onSubmit) =>
    html` 
    ${navTemplate()}
    <section id="login-section">
        <div id="login-container">
            <div id="loginForm-container">
                <form @submit=${onSubmit} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <label for="username">Username</label><br>
                    <div class="icon">
                        <i class="fas fa-envelope-open-text"></i>
                        <input name="username" type="text" autocomplete="username"><br>
                    </div>
                    <label for="password">Password</label><br>
                    <div class="icon">
                        <i class="fas fa-unlock"></i>
                        <input id="login-password" type="password" autocomplete="current-password" name="password">
                        <i id="eye-three" class="fas fa-eye" class="togglePassword"></i>
                        <br>
                    </div>
                    <div>
                        <button type="submit" class="loginBtn">Login</button>
                    </div>
                </form>
                <div class="second">
                    <a class="link" href="/register">Create new account</a>
                    <a class="link" href="javascript:void(0)">Forgot Password?</a>
                </div>
            </div>
        </div>
        <div id="login-image">
            <img src="../images/forest-road.png">
        </div>
    </section>`;

export async function loginPage(context) {
    context.render(loginTemplate(onSubmit));
    setUserNav();
    toggleEye();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        if (username === '' || username === null || password === '' || password === null) {
            notify('All fields are required!');
            return;
        }

        await login(username, password);
        setUserNav();
        context.page.redirect('/home');
    }
}