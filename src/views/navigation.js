import {html} from 'https://unpkg.com/lit-html?module';

export const navTemplate = () => html`
<div class="header-field">
  <!--Header-->
  <header>
    <nav class='nav-style'>
      <ul class='ul-style'>
        <div class="left">
          <li>
            <a id="home-link" class="common active" href='/home'>Home</a>
          </li>
          <li>
            <a id="map" class="common" href="/map">The World</a>
          </li>
          <li>
            <a id="about-link" class="common" href="/blog">Blog</a>
          </li>
          <li>
            <a id="book-link" class="common" href="/about-magesnitza">The Book</a>
          </li>
        </div>

        <div class="right">
          <li>
            <a id="login-link" class="guest" href="/login">Login</a>
          </li>
          <li>
            <a id="register-link" class="guest" href="/register">Register</a>
          </li>
          <li>
          <a href="/profile">Welcome, <span id="welcome-user" class="user"></span></a>
          </li>
          <li>
            <a class="user" id="logoutBtn" href="javascript:void(0)">Logout</a>
          </li>
          <li>
            <a id="language" class="common" href="/home-bg">BG</a>
          </li>
        </div>
      </ul>
      <a href='#' id='openup'>MENU</a>
    </nav>
  </header>
</div>`;


export const navTemplateBg = () => html`
<div class="header-field">
  <!--Header-->
  <header>
    <nav class='nav-style'>
      <ul class='ul-style'>
        <div class="left">
          <li>
            <a id="home-link" class="common active" href='/home-bg'>Начало</a>
          </li>
          <li>
            <a id="map" class="common" href="/map-bg">Светът</a>
          </li>
          <li>
            <a id="about-link" class="common" href="/blog">Блог</a>
          </li>
          <li>
            <a id="book-link" class="common" href="/about-magesnitza-bg">Книгата</a>
          </li>
        </div>

        <div class="right">
          <li>
            <a id="login-link" class="guest" href="/login-bg">Вход</a>
          </li>
          <li>
            <a id="register-link" class="guest" href="/register-bg">Регистрация</a>
          </li>
          <li>
            <a href="/profile">Welcome, <span id="welcome-user" class="user"></span></a>
          </li>
          <li>
            <a class="user" id="logoutBtn" href="javascript:void(0)">Изход</a>
          </li>
          <li>
            <a id="language" class="common" href="/home">EN</a>
          </li>
        </div>
      </ul>
      <a href='#' id='openup'>MENU</a>
    </nav>
  </header>
</div>`;

export function setUserNav() {
  const userId = localStorage.getItem('userId');
  const welcomeUser = document.getElementById('welcome-user');
  const username = localStorage.getItem('username');

  if (userId != null) {
    [...document.querySelectorAll('.header-field > header > nav > ul > div > li > a.user')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > header > nav > ul > div > li > a.common')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > header > nav > ul > div > li > a.guest')].forEach(el => el.style.display = 'none');
    welcomeUser.textContent = `${username}`;
  } else {
    [...document.querySelectorAll('.header-field > header > nav > ul > div > li > a.user')].forEach(el => el.style.display = 'none');
    [...document.querySelectorAll('.header-field > header > nav > ul > div > li > a.common')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > header > nav > ul > div > li > a.guest')].forEach(el => el.style.display = 'inline-block');
    welcomeUser.style.display = "none";
  }
}