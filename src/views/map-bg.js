import {html} from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from "../../index.js";
import { navTemplateBg, setUserNav } from "./navigation.js";

const mapTemplateBg = () => html`
${navTemplateBg()}
<section class="map noselect">
  <div @click=${toggleDiv} class="map-wrapper">
    <a class="map-title-en" href="javascript:void(0)">Светът на Магесница</a>
    <div class="avatar-block">
      <img class="avatar" src="./images/avatar.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Самодиви</a>
    </div>

    <div class="avatar1-block">
      <img class="avatar" src="./images/avatar2.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Братството</a>
    </div>

    <div class="avatar2-block">
      <img class="avatar" src="./images/avatar3.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Кръвници</a>
    </div>
    <div class="avatar3-block">
      <img class="avatar" src="./images/avatar4.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Змеят от Парория</a>
    </div>
    <div class="avatar4-block">
      <img class="avatar" src="./images/avatar5.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Убежището на Световид</a>
    </div>
    <div class="avatar5-block">
      <img class="avatar" src="./images/avatar6.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Търновград</a>
    </div>
    <div class="avatar6-block">
      <img class="avatar" src="./images/avatar7.png" alt="Avatar">
      <a class="avatar-link" href="javascript:void(0)">Славееви гори</a>
    </div>
  </div>

  <div class="legend">
    <h1><i class="fas fa-info-circle fa-1x"></i>Легенда:</h1>
    <ul @click=${toggleLegend} id="races">
      <li><i class="fas fa-angle-down"></i>Братството</li>
      <div id="brotherhood" class="info" style="display: none;">Призванието на воините на светлината е да бъдат
        защитници на народа, пазители на историята и безсмъртни борци срещу злото по българските земи. Те притежават
        магически умения и древни знания, което ги прави едни от най-силните врагове на самодивите, кръвниците и
        Превитата Световид. Пръв водач на Братството е Баян Магесник, но след смъртта му, техен водач става Белян.</div>

      <li><i class="fas fa-angle-down"></i>Самодиви</li>
      <div id="fairies" class="info" style="display: none;">Грациозни, но опасни горски създания - духове, обсебили
        девичи тела. От техните песни и танци по-омайни няма и само с поглед могат да омагьосат човек, да го ослепят
        и дори да го убият. Своенравни и коварни. Притежават магически сили, които им дават преимущество пред
        кръвниците, с които не се понасят, но все пак не могат да се сравняват по мощ със силите на Братството.</div>

      <li><i class="fas fa-angle-down"></i>Кръвници</li>
      <div id="brutes" class="info" style="display: none;">Предвождат се от господаря си Михаил - слуга на Световид.
        Те са хора, умрели някога по неестествен начин, без да бъдат оплакани и погребани според обичаите. Били
        наказани от Боговете, които не ги допускали в света на мъртвите, където да намерят покой. Душата им оставала
        в света на живите, където блуждаела и страдала, а накрая се превръщала в зъл дух. След това мъртвецът се
        връщал обратно в своето или в чуждо тяло, като се вдигал от гроба.</div>

      <li><i class="fas fa-angle-down"></i>Змеят от Парория</li>
      <div id="zmey" class="info" style="display: none;">Парория е местност в днешна Странджа планина. Там е
        убежището на неустоимият по хубост Змей Владимир. Неговата мощ се изразява в контрол и владение над
        природните сили. Слуга и ученик на Световид, той запазва неутралност, докато не бива повикан от господаря
        си. Опасен и могъщ противник, с който дори воин на светлината не би могъл да се мери по магическа сила.</div>

      <li><i class="fas fa-angle-down"></i>Славееви гори</li>
      <div id="mountains" class="info" style="display: none;">Така е била наричана Родопа планина през
        Средновековието. Именно там, в светилището на белия камък, Световид успява да извършва своите жестоки
        жертвоприношения и тъмни ритуали. Огромният магически заряд на местността, увеличава мощта и способностите
        му.</div>

      <li><i class="fas fa-angle-down"></i>Убежището на Световид</li>
      <div id="svetovid" class="info" style="display: none;">То се намира в град Белград – днешен Белоградчик.
        Световид е зъл превита, силен, но покварен. Отдаден да служи на мрака, той не се спира пред нищо, ако иска
        да унищожи врага си и е най-опасният противник на Братството. Сключва съюз с Долната земя, откъдето
        подхранва магията си до невиждани размери.</div>

      <li><i class="fas fa-angle-down"></i>Търновград</li>
      <div id="tarnovgrad" class="info" style="display: none;">Това е днешният град Велико Търново. Така е бил
        наричан през Средновековието. Превръща се в най-значимия политически, икономически, културен и религиозен
        център на България по онова време.</div>
    </ul>
  </div>
</section>`;

export async function mapPageBg(context) {
  context.render(mapTemplateBg());
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
      case "братството":
        toggle(brotherhood); break;
      case "самодиви":
        toggle(fairies); break;
      case "кръвници":
        toggle(brutes); break;
      case "змеят от парория":
        toggle(zmey); break;
      case "славееви гори":
        toggle(mountains); break;
      case "убежището на световид":
        toggle(svetovid); break;
      case "търновград":
        toggle(tarnovgrad); break;
  }

  function toggle(el) {
    hideShow(el);
    setTimeout(function () { hideShow(el); }, 20000);
  }
}