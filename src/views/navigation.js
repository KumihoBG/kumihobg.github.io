import { html } from 'https://unpkg.com/lit-html?module';

export const navTemplate = () => html`
<div class="header-field">
  <!--Header-->
  <header id="desktop">
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
        </div>

        <div class="right">
          <li>
            <a id="login-link" class="guest" href="/login">Login</a>
          </li>
          <li>
            <a id="register-link" class="guest" href="/register">Register</a>
          </li>
          <li>
            <span id="welcome-user" class="user"></span>
          </li>
          <li>
            <a href="/profile" class="user">Profile</a>
          </li>
          <li>
            <a class="user" id="logoutBtn" href="javascript:void(0)">Logout</a>
          </li>
          <li>
            <a id="language" class="common" href="/home-bg">BG</a>
          </li>
        </div>
      </ul>
    </nav>
  </header>

  <header id="mobile">
  <nav class="main-nav">
    <ul class="main-menu">
        <li class="common active">
          <a id="home-link" class="common active" href='/home'>Home</a>
        </li>
        <li class="common">
          <a id="about-link" class="common" href="/blog">Blog</a>
        </li>
        <li class="guest">
          <a id="login-link" class="guest" href="/login">Login</a>
        </li>
        <li class="guest">
          <a id="register-link" class="guest" href="/register">Register</a>
        </li>
        <li class="user">
          <a href="/profile" class="user">Profile</a>
        </li>
        <li class="user">
          <a class="user" id="logoutBtn" href="javascript:void(0)">Logout</a>
        </li>
        <li class="common">
          <a id="language" class="common" href="/home-bg">BG</a>
        </li>
    </ul>
  </nav>
  </header>
</div>`;


export const navTemplateBg = () => html`
<div class="header-field">
  <!--Header-->
  <header id="desktop">
    <nav class='nav-style'>
      <ul class='ul-style'>
        <div class="left">
          <li>
            <a id="home-link" class="common active" href='/home-bg'>????????????</a>
          </li>
          <li>
            <a id="map" class="common" href="/map-bg">????????????</a>
          </li>
          <li>
            <a id="about-link" class="common" href="/blog-bg">????????</a>
          </li>
        </div>

        <div class="right">
          <li>
            <a id="login-link" class="guest" href="/login-bg">????????</a>
          </li>
          <li>
            <a id="register-link" class="guest" href="/register-bg">??????????????????????</a>
          </li>
          <li>
            <span id="welcome-user" class="user"></span>
          </li>
          <li>
            <a href="/profile-bg" class="user">????????????</a>
          </li>
          <li>
            <a class="user" id="logoutBtn" href="javascript:void(0)">??????????</a>
          </li>
          <li>
            <a id="language" class="common" href="/home">EN</a>
          </li>
        </div>
      </ul>
    </nav>
  </header>

  <header id="mobile">
  <nav class="main-nav">
    <ul class="main-menu">
        <li class="common active">
          <a id="home-link" class="common active" href='/home-bg'>????????????</a>
        </li>
        <li class="common">
          <a id="about-link" class="common" href="/blog-bg">????????</a>
        </li>
        <li class="guest">
          <a id="login-link" class="guest" href="/login-bg">????????</a>
        </li>
        <li class="guest">
          <a id="register-link" class="guest" href="/register-bg">??????????????????????</a>
        </li>
        <li class="user">
          <a href="/profile-bg" class="user">Profile</a>
        </li>
        <li class="user">
          <a class="user" id="logoutBtn" href="javascript:void(0)">??????????</a>
        </li>
        <li class="common">
          <a id="language" class="common" href="/home">EN</a>
        </li>
    </ul>
  </nav>
  </header>
</div>`;

export function setUserNav() {
  const userId = localStorage.getItem('userId');
  const welcomeUser = document.getElementById('welcome-user');
  const username = localStorage.getItem('username');

  if (userId != null) {
    [...document.querySelectorAll('.header-field > #desktop > nav > ul > div > li > a.user')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > #desktop > nav > ul > div > li > a.common')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > #desktop > nav > ul > div > li > a.guest')].forEach(el => el.style.display = 'none');
    
    [...document.querySelectorAll('.header-field > #mobile > nav > ul > li.user')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > #mobile > nav > ul > li.common')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > #mobile > nav > ul > li.guest')].forEach(el => el.style.display = 'none');
    if (document.documentElement.lang == 'en') {
      welcomeUser.textContent = `Welcome, ${username}`;
    } else {
      welcomeUser.textContent = `??????????????, ${username}`;
    }
  } else {
    [...document.querySelectorAll('.header-field > #desktop > nav > ul > div > li > a.user')].forEach(el => el.style.display = 'none');
    [...document.querySelectorAll('.header-field > #desktop > nav > ul > div > li > a.common')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > #desktop > nav > ul > div > li > a.guest')].forEach(el => el.style.display = 'inline-block');

    [...document.querySelectorAll('.header-field > #mobile > nav > ul > li.user')].forEach(el => el.style.display = 'none');
    [...document.querySelectorAll('.header-field > #mobile > nav > ul > li.common')].forEach(el => el.style.display = 'inline-block');
    [...document.querySelectorAll('.header-field > #mobile > nav > ul > li.guest')].forEach(el => el.style.display = 'inline-block');
    welcomeUser.style.display = "none";
  }
}