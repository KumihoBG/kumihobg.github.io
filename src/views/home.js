import {html} from 'https://unpkg.com/lit-html?module';
import { decorateContext, logoutEvent, parallaxEffect } from "../../index.js";
import { footerTemplate } from "./footer.js";
import { homePageBg } from "./home-bg.js";
import { navTemplate, setUserNav } from "./navigation.js";

const homePageTemplate = (onSubscribe) => html`
${navTemplate()}
<section id="parallax-container">
  <div id="parallax">
    <h2 id="text"><span>Fantasy Novel</span><br>Magesnitza</h2>
    <img src="./images/bird1.png" id="bird1">
    <img src="./images/bird2.png" id="bird2">
    <img src="./images/forest.png" id="forest">
    <a href="/map" id="parallaxBtn">Explore the world of Magesnitza</a>
    <img src="./images/rocks.png" id="rocks">
    <img src="./images/water.png" id="water">
  </div>
  <div class="sec">
    <h1 id="secTitle">Main Characters</h1>
    <div id="characters-frame">
      <div id="one">
        <img id="Aspar" src="./images/Aspar.jpg" alt="Aspar">
        <h2>Aspar</h2>
      </div>
      <div id="two">
        <img id="Lexi" src="./images/Lexi.jpg" alt="Lexi">
        <h2>Lexi</h2>
      </div>
      <div id="three">
        <img id="Dena" src="./images/Dena.jpg" alt="Dena">
        <h2>Dena</h2>
      </div>
    </div>
  </div>
</section>

${footerTemplate(onSubscribe)}`;

export async function homePage(context) {
  context.render(homePageTemplate(onSubscribe));
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

  async function onSubscribe(event) {
    event.preventDefault();
    const myNewObject = new Parse.Object('Subscriber');
    try {
      const result = await myNewObject.save();
      // Access the Parse Object attributes using the .GET method
      console.log('Subscriber created', result);
    } catch (error) {
      console.error('Error while creating Subscriber: ', error);
    }
  }
}