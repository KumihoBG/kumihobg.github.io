// import vendor libraries
import { render } from 'https://unpkg.com/lit-html?module';

// local modules
import { setUserNav } from "./src/views/navigation.js";
import { logout } from "./src/api/data.js";
import { homePage } from "./src/views/home.js";
import { homePageBg } from "./src/views/home-bg.js";
import { mapPage } from "./src/views/map.js";
import { mapPageBg } from "./src/views/map-bg.js";
import { loginPage } from "./src/views/login.js";
import { loginPageBg } from "./src/views/login-bg.js";
import { registerPage } from "./src/views/register.js";
import { registerPageBg } from "./src/views/register-bg.js";
import { profilePage } from "./src/views/profile.js";
import { infoPage } from "./src/views/blog.js";
import { infoPageBg } from "./src/views/blog-bg.js";
import { profilePageBg } from './src/views/profile-bg.js';

const main = document.querySelector('#main');

// Implementing the routing - these callback functions are called View Controllers
// View Controllers -> fetch data (get, post, put, del), interpolate template, handle user input, return/render content
page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/home-bg', decorateContext, homePageBg);
page('/index.html', decorateContext, homePage);
page('/map', decorateContext, mapPage);
page('/map-bg', decorateContext, mapPageBg);
page('/login', decorateContext, loginPage);
page('/login-bg', decorateContext, loginPageBg);
page('/blog', decorateContext, infoPage);
page('/blog-bg', decorateContext, infoPageBg);
page('/register', decorateContext, registerPage);
page('/register', decorateContext, registerPage);
page('/register-bg', decorateContext, registerPageBg);
page('/profile', decorateContext, profilePage);
page('/profile-bg', decorateContext, profilePageBg);

// start page library
page.start();

export function decorateContext(context, next) {
  context.render = (content) => render(content, main);
  next();
}

export function parallaxEffect() {
  const text = document.getElementById('text');
  const bird1 = document.getElementById('bird1');
  const bird2 = document.getElementById('bird2');
  const forest = document.getElementById('forest');
  const rocks = document.getElementById('rocks');
  const parallaxBtn = document.getElementById('parallaxBtn');

  document.addEventListener('scroll', () => {
    const value = window.scrollY;
    text.style.top = 50 + value * -0.1 + '%';
    bird1.style.top = value * -1.5 + 'px';
    bird1.style.left = value * 2 + 'px';
    bird2.style.top = value * -1.5 + 'px';
    bird2.style.left = value * -5 + 'px';
    rocks.style.top = value * -0.12 + 'px';
    forest.style.top = value * 0.25 + 'px';
    parallaxBtn.style.marginTop = value * 1.5 + 'px';
  });

  setUserNav();
}

export async function logoutEvent() {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', async () => {
    await logout();
    setUserNav();
    const languageBtn = document.getElementById('language');
    const language = languageBtn.innerText;
    if (language === 'BG') {
      page.redirect('/login');
    } else {
      page.redirect('/login-bg');
    }
  });
}

parallaxEffect();

export function toggleEye() {
  const password = document.getElementById('password');
  const repeatPass = document.getElementById('repeatPass');
  const loginPassword = document.getElementById('login-password');
  const repeatPassword = document.getElementById('repeat-password');
  const newPassword = document.getElementById('new-password');
  const eyeOne = document.getElementById('eye-one');
  const eyeTwo = document.getElementById('eye-two');
  const eyeThree = document.getElementById('eye-three');
  const eyeFour = document.getElementById('eye-four');
  const eyeFive = document.getElementById('eye-five');

  if (eyeOne !== null) {
    eyeOne.addEventListener('click', function () {
      toggleInputEl(eyeOne, password);
    });
  }
  if (eyeTwo !== null) {
    eyeTwo.addEventListener('click', function () {
      toggleInputEl(eyeTwo, repeatPass);
    });
  }
  if (eyeThree !== null) {
    eyeThree.addEventListener('click', function () {
      toggleInputEl(eyeThree, loginPassword);
    });
  }
  if (eyeFour !== null) {
    eyeFour.addEventListener('click', function () {
      toggleInputEl(eyeFour, newPassword);
    });
  }
  if (eyeFive !== null) {
    eyeFive.addEventListener('click', function () {
      toggleInputEl(eyeFive, repeatPassword);
    });
  }
}

// toggle the type attribute
function toggleInputEl(element, password) {
  const type = password.getAttribute('type');
  if (type === 'password' && password.value !== '') {
    element.classList.add('fa-eye-slash');
    element.classList.remove('fa-eye');
    password.setAttribute('type', 'text');
  } else if (type === 'text' && password.value !== '') {
    element.classList.add('fa-eye');
    element.classList.remove('fa-eye-slash');
    password.setAttribute('type', 'password');
  }
}