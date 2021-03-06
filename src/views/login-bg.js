import {html} from 'https://unpkg.com/lit-html?module';
import { toggleEye } from '../../index.js';
import { passwordReset } from '../api/data.js';
import { login} from "../api/data.js";
import { navTemplateBg, setUserNav } from "./navigation.js";


const loginTemplateBg = (onSubmit, onReset) =>
    html` 
    ${navTemplateBg()}
    <section id="login-section">
        <div id="login-container">
            <div id="loginForm-container">
                <form @submit=${onSubmit} id="login-form" action="#" method="post">
                    <h1>Вход</h1>
                    <p>Моля, въведете вашите идентификационни данни.</p>
                    <label for="username">Username</label><br>
                    <div class="icon">
                        <i class="fas fa-envelope-open-text"></i>
                        <input name="username" type="text" autocomplete="username"><br>
                    </div>
                    <label for="password">Вашата парола</label><br>
                    <div class="icon">
                        <i class="fas fa-unlock"></i>
                        <input id="login-password" type="password" autocomplete="current-password" name="password">
                        <i id="eye-three" class="fas fa-eye" class="togglePassword"></i>
                        <br>
                    </div>
                    <div>
                        <button type="submit" class="loginBtn">Вход</button>
                    </div>
                </form>
                <div class="second">
                    <a class="link" href="/register-bg">Създай нов профил</a>
                    <a @click=${onReset} class="link" href="javascript:void(0)">Забравили сте паролата си?</a>
                </div>
            </div>
        </div>
        <div id="login-image">
            <img src="../images/forest-road.png">
        </div>
    </section>`;

export async function loginPageBg(context) {
    context.render(loginTemplateBg(onSubmit, onReset));
    setUserNav();
    toggleEye();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        if (username === '' ||  username === null || password === '' || password === null) {
            alert('Всички полета са задължителни!');
            return;
        }

        await login(username, password);
        setUserNav();
        toggleEye();
        context.page.redirect('/home-bg');
    }
    
    async function onReset(event) {
        event.preventDefault();
        const email = localStorage.getItem('email');
        await passwordReset(email);
    }
}



