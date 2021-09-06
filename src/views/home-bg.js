import {html} from 'https://unpkg.com/lit-html?module';
import { decorateContext, logoutEvent, parallaxEffect } from "../../index.js";
import { footerTemplateBg } from "./footer.js";
import { homePage } from "./home.js";
import { navTemplateBg, setUserNav } from "./navigation.js";

const homePageBgTemplate = () => html`
${navTemplateBg()}
<section id="parallax-container">
  <div id="parallax">
    <h2 id="text"><span>Фентъзи Новела</span><br>Магесница</h2>
    <img src="./images/bird1.png" id="bird1">
    <img src="./images/bird2.png" id="bird2">
    <img src="./images/forest.png" id="forest">
    <a href="/map" id="parallaxBtn">Виж света на Магесница</a>
    <img src="./images/rocks.png" id="rocks">
    <img src="./images/water.png" id="water">
  </div>
  <div class="sec">
    <h1 id="secTitle">Главни герои</h1>
    <div id="characters-frame">
      <div id="one">
        <img id="Aspar" src="./images/Aspar.jpg" alt="Aspar">
        <h2>Аспар</h2>
      </div>
      <div id="two">
        <img id="Lexi" src="./images/Lexi.jpg" alt="Lexi">
        <h2>Лекси</h2>
      </div>
      <div id="three">
        <img id="Dena" src="./images/Dena.jpg" alt="Dena">
        <h2>Дена</h2>
      </div>
    </div>
  </div>
</section>

${footerTemplateBg()}`;

export async function homePageBg(context) {
  context.render(homePageBgTemplate());
  setUserNav();
  
  const language = document.getElementById('language');

  language.addEventListener('click', () => {
    if (language.textContent === 'BG') {
      page('/home-bg', decorateContext, homePageBg);
    } else {
      page('/home', decorateContext, homePage);
    }
  });
  parallaxEffect();
  logoutEvent();  
}