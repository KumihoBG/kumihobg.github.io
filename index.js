console.log('It works!');
// import vendor libraries
import { render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

// local modules
import { setUserNav } from "./src/views/navigation.js";
import { homePage } from "./src/views/home.js";
import { homePageBg } from "./src/views/home-bg.js";
import { mapPage } from "./src/views/map.js";
import { mapPageBg } from "./src/views/map-bg.js";
import { loginPage } from "./src/views/login.js";
import { loginPageBg } from "./src/views/login-bg.js";
import { registerPage } from "./src/views/register.js";
import { registerPageBg } from "./src/views/register-bg.js";
import { searchPage } from "./src/views/search.js";
import { aboutBookPage } from "./src/views/about-magesnitza.js";
import { aboutBookPageBg } from "./src/views/about-magesnitza-bg.js";
import { infoPage } from "./src/views/blog.js";
import { logout } from "./src/api/api.js";
import { profilePage } from "./src/views/profile.js";

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
page('/about-magesnitza', decorateContext, aboutBookPage);
page('/about-magesnitza-bg', decorateContext, aboutBookPageBg);
page('/register', decorateContext, registerPage);
page('/register', decorateContext, registerPage);
page('/register-bg', decorateContext, registerPageBg);
page('/search', decorateContext, searchPage);
page('/profile', decorateContext, profilePage);

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
    page.redirect('/home');
  });
}

parallaxEffect();

export function toggleEye() {
  const password = document.getElementById('password');
  const repeatPass = document.getElementById('repeatPass');
  const eyeOne = document.getElementById('eye-one');
  const eyeTwo = document.getElementById('eye-two');

  eyeOne.addEventListener('click', function () {
    // toggle the type attribute
    toggleInputEl(eyeOne, password);
  });

  eyeTwo.addEventListener('click', function () {
    // toggle the type attribute
    toggleInputEl(eyeTwo, repeatPass);
  });
}

function toggleInputEl(element, password) {
  const type = password.getAttribute('type');
  if (type === 'password') {
    element.classList.add('fa-eye-slash');
    element.classList.remove('fa-eye');
    password.setAttribute('type', 'text');
  } else if (type === 'text') {
    element.classList.add('fa-eye');
    element.classList.remove('fa-eye-slash');
    password.setAttribute('type', 'password');
  }
}

