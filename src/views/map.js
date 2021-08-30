import {html} from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from "../../index.js";
import { footerTemplate } from "./footer.js";
import { navTemplate, setUserNav } from "./navigation.js";

const mapTemplate = () => html`
${navTemplate()}
<section id="parallaxSection" class="map noselect">
  <div @click=${toggleDiv} class="map-wrapper">
    <a class="map-title-en" href="javascript:void(0)">World of Magesnitza</a>
    <div class="avatar-block">
      <img class="avatar" src="./images/avatar.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Forest Fairies</a>
    </div>
    <div class="avatar1-block">
      <img class="avatar" src="./images/avatar2.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Brotherhood</a>
    </div>
    <div class="avatar2-block">
      <img class="avatar" src="./images/avatar3.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Brutes</a>
    </div>
    <div class="avatar3-block">
      <img class="avatar" src="./images/avatar4.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Zmey of Paroria</a>
    </div>
    <div class="avatar4-block">
      <img class="avatar" src="./images/avatar5.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Svetovid's Lair</a>
    </div>
    <div class="avatar5-block">
      <img class="avatar" src="./images/avatar6.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Tarnovgrad</a>
    </div>
    <div class="avatar6-block">
      <img class="avatar" src="./images/avatar7.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Slavey Mountains</a>
    </div>
  </div>

  <div class="legend">
    <h1><i class="fas fa-info-circle fa-1x"></i>Legend:</h1>
    <ul @click=${toggleLegend} id="races">
      <li><i class="fas fa-angle-down"></i>Brotherhood</li>
      <div id="brotherhood" class="info" style="display: none;">The vocation of the warriors of light is to be defenders
        of the people,
        guardians of history and immortal fighters against evil in the Bulgarian lands. They have magical skills and
        ancient knowledge, which makes them one of the strongest enemies of the forest fairies, brutes and Svetovid. The
        first leader of the Brotherhood was Bayan Magesnik, but after his death, Belyan became their leader.</div>

      <li><i class="fas fa-angle-down"></i>Forest Fairies</li>
      <div id="fairies" class="info" style="display: none;">Graceful but dangerous forest creatures - ghosts, obsessed
        with maiden
        bodies. There is nothing more enchanting than their songs and dances and they can enchant a person, blind him
        and even kill him with just a glance. Wayward and insidious. They have magical powers that give them an
        advantage over the brutes they can't stand, but they still can't compare in strength to the Brotherhood's
        powers.</div>

      <li><i class="fas fa-angle-down"></i>Brutes</li>
      <div id="brutes" class="info" style="display: none;">They are led by their master Michael - a servant of Svetovid.
        They are
        people who once died unnaturally, without being mourned and buried according to custom. They were punished by
        the Gods, who did not allow them in the world of the dead to find peace. Their souls remained in the world of
        the living, where they wandered and suffered, and finally became an evil spirit. The dead man then returned to
        his own or another's body, rising from the grave.</div>

      <li><i class="fas fa-angle-down"></i>Zmey of Paroria</li>
      <div id="zmey" class="info" style="display: none;">Paroria is a place in today's Strandzha mountain. There is the
        refuge of
        the irresistibly beautiful Zmey Vladimir. His power is expressed in control and possession of natural forces. A
        servant and disciple of Svetovid, he remained neutral until summoned by his master. A dangerous and powerful
        adversary with whom even a warrior of light could not be measured by magical power.</div>

      <li><i class="fas fa-angle-down"></i>Slavey Mountains</li>
      <div id="mountains" class="info" style="display: none;">This was the name of the Rhodopes Mountains in the Middle
        Ages. It was
        there, in the sanctuary of the white stone, that Svetovid managed to perform his cruel sacrifices and dark
        rituals. The huge magical charge of the area increases its power and abilities.</div>

      <li><i class="fas fa-angle-down"></i>Svetovid's Lair</li>
      <div id="svetovid" class="info" style="display: none;">It is located in the city of Belgrade - today's
        Belogradchik. The mage is
        evilly twisted, strong, but corrupt. Dedicated to serving the darkness, he stops at nothing if he wants to
        destroy his enemy and is the most dangerous opponent of the Brotherhood. He enters into an alliance with the
        Underworld, from where he nurtures his magic to unprecedented proportions.</div>

      <li><i class="fas fa-angle-down"></i>Tarnovgrad</li>
      <div id="tarnovgrad" class="info" style="display: none;">This is today's city of Veliko Tarnovo. It was called so
        in the Middle
        Ages. It became the most important political, economic, cultural and religious center of Bulgaria at that time.
      </div>
    </ul>
  </div>
</section>
${footerTemplate()}`;

export async function mapPage(context) {
  context.render(mapTemplate());
  setUserNav();
  logoutEvent();
}

function hideShow(el) {
  if (el.style.display == "none") {
    el.style.display = "block"
  } else {
    el.style.display = "none"
  }
}

function toggleLegend(e) {
  const current = e.target;
  current.addEventListener('click', hideShow(current.nextElementSibling));
  setTimeout(function () { hideShow(current.nextElementSibling); }, 20000);
}

function toggleDiv(e) {
  const currentAvatar = e.target.closest('div');
  const name = currentAvatar.innerText.toLowerCase();
  const brotherhood = document.getElementById('brotherhood');
  const fairies = document.getElementById('fairies');
  const brutes = document.getElementById('brutes');
  const zmey = document.getElementById('zmey');
  const mountains = document.getElementById('mountains');
  const svetovid = document.getElementById('svetovid');
  const tarnovgrad = document.getElementById('tarnovgrad');

  switch (name) {
    case "brotherhood":
      toggle(brotherhood); break;
    case "forest fairies":
      toggle(fairies); break;
    case "brutes":
      toggle(brutes); break;
    case "zmey of paroria":
      toggle(zmey); break;
    case "slavey mountains":
      toggle(mountains); break;
    case "svetovid's lair":
      toggle(svetovid); break;
    case "tarnovgrad":
      toggle(tarnovgrad); break;
  }

  function toggle(el) {
    hideShow(el);
    setTimeout(function () { hideShow(el); }, 20000);
  }
}

