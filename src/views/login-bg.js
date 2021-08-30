import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";
import { navTemplateBg, setUserNav } from "./navigation.js";

const loginTemplateBg = (onSubmit) =>
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
                        <input type="password" autocomplete="current-password" name="password"><br>
                    </div>
                    <div>
                        <button type="submit" class="loginBtn">Вход</button>
                    </div>
                </form>
                <div class="second">
                    <a class="link" href="/register-bg">Създай нов профил</a>
                    <a class="link" href="/register-bg">Забравили сте паролата си?</a>
                </div>
            </div>
        </div>
        <div id="login-image">
            <img src="../images/forest-road.png">
        </div>
    </section>`;

export async function loginPageBg(context) {
    context.render(loginTemplateBg(onSubmit));
    setUserNav();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        if (username == '' || password == '') {
            alert('Всички полета са задължителни!');
            return;
        }

        await login(username, password);
        setUserNav();
        context.page.redirect('/home-bg');
    }
}



