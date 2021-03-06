import { html } from 'https://unpkg.com/lit-html?module';
import { decorateContext, logoutEvent, parallaxEffect } from "../../index.js";
import { footerPageBg } from './footer-bg.js';
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
    <h1 id="secTitle">Магесница - Фентъзи новела от Кумихо</h1>
    ${aboutBookTemplateBg()}
  </div>
</section>`;

const aboutBookTemplateBg = () => html`
<section class="my-book">
  <div class="my-book-container">
    <div id="sinopsis">
      <h3>Как започна всичко...</h3>
      <p class="text-light">Историята на моите герои оживя една декемврийска вечер през 2015 г., когато най-малко го
        очаквах. Точно както повечето добри идеи идват при нас случайно, така и моите герои започнаха да живеят своя
        тайнствен живот в съзнанието ми, докато стоях и кротко ровех из интернет. Известно време изпитвах вътрешно
        чувство на недоволство от настоящата си работа, сякаш беше абсолютна загуба на време. Имах нужда от промяна.
        Исках да избягам от ежедневието си. Имах нужда от нещо различно, защото всичко вътре в мен крещеше, че имам
        повече да допринеса в живота си. И така, без да се замислям много, създадох празен файл и думите започнаха
        да текат сами - сякаш винаги бяха там, но ненаписани. А аз обичам да пиша. Винаги съм го знаела.</p>
      <p class="text-light">Тази страст ми послужи добре в училище, а след това и на работа, докато все още
        практикувах право. Но това, което излезе като краен резултат от работата ми, не ми беше достатъчно. Исках
        повече. Исках да покажа повече от себе си, да споделя въображението си, а не просто да прилагам закона.
        Исках да създам нещо уникално и да вплета колкото се може повече емоции в него. Исках да дам воля на сърцето
        си. Писането за мен беше друга реалност - тази на възможните неща, защото в книгата можеш да бъдеш всеки и
        всичко. Имате свят, в който да се потопите, да се слеете и да изпитате всичко, от което животът наистина ви
        ограбва.</p>
      <p class="text-light">Тази книга е началото на моето приключение, което искам да изживея заедно с вас.
        Проследява преживяванията на главния ми герой - Александра Борисова (Лекси). Тя прилича на мен, но не е мен.
        Тя е всичко, което мечтаех да бъда един ден, но не успях да постигна. Като цяло, ако се запознаете с
        книгата, ще станете свидетели на пътуване във времето. Ще откриете, че в миналото хората все още са вярвали
        в чудеса, заклинания и магия. Ще срещнете безсмъртни същества и ще си спомните славното ни минало. Това е
        фантастична история. Не я анализирайте и не я сравнявайте с истината, защото е просто измислица, в която
        избрах да вярвам. </p>
      <h3>Защо написах тази книга?</h3>
      <p class="text-light">За да я посветя на вас - на всички, които все още вярват в старите традиции и магически
        обичаи и които все още имат смелостта да мечтаят и да се вдъхновяват от историята по нашите земи. Мечтая
        българите да осъзнаят колко сила се крие в тях самите, колко са способни да променят света си и колко трябва
        да се гордеят с богатото си минало, митове и легенди. Не твърдя, че съм пресъздала с историческа точност
        събитията, описани или засегнати в моята история. Някои от персонажите, като Баян Магесник, всъщност са
        личности, станали обект на много исторически и художествени творби. Историческата личност на княз
        Венеамин-Боян се трансформира от редица български автори в художествен образ много преди да реша да напиша
        тази фантастична история. Всички останали герои са изцяло измислени от мен, но също така се основават на
        прочетеното: български митове, легенди и истории. Княгиня Бояна, воините на светлината, самодивите - всички
        те оживяват в моето въображение, за да изразят детската ми вяра, че някъде там, сред нас, се скитат невидими
        за нас сили. Голяма част от информацията за моите герои съм събрала от Интернет - форуми, блогове, статии и
        коментари. Благодарна съм на всички, които дариха своето време и усилия да споделят с нас ценната
        информация, която в крайна сметка събуди желанието ми да ви разкажа моята приказка за друг един възможен
        свят - свят на любов, магия и приключения. Надявам се книгата да ви хареса.</p>
      <div id="book-cover">
        <h3>Кратък откъс от книгата...</h3>
        <p class="text-light">"Някои казват, че когато опасността те връхлита с яростна бързина, времето уж спира и
          че
          съзнанието ти възприема случващото се на забавен каданс. Обаче времето не спря, не се забави, не донесе
          избавление. Едно последно ахване от изненада и толкова. Тя нямаше никакво време за реакция в този миг.
          Чувството бе такова, сякаш бе попаднала в огромен блендер и някой е натиснал копчето за включването му. Бе
          като парцалена кукла, захвърлена от отегчено дете. Никаква форма на контрол над ситуацията. Болката от
          удара
          бе толкова нетърпима, че повторният удар със земята почти не се усети.</p>
        <p class="text-light">За части от секундата, мозъкът ѝ опита да асимилира ставащото, но без резултат. Някъде
          на заден план, тя все още можеше да чуе Стинг, който мечтае за своята пустинна роза: "I dream of rain, I
          dream of gardens in the desert sand, I wake in pain, I dream of love as time runs through my hand". Тялото
          ѝ
          прелетя няколко метра и се приземи неловко на земята с неестествено подвити крайници. Кръвта полека си
          проправи път по мокрия асфалт и образува малки локвички, смесвайки се с октомврийския дъжд.
          После дойде тъмнината и блажената безчувственост."</p>
      </div>
    </div>
    <!--Sidebar-->
    <aside id="sidebar">
      <div class="get-in-touch">
        <div id="icons-container">
          <a target="_blank" href="#"><i id="facebook" class="fab fa-facebook fa-2x"></i>
          </a><a target="_blank" href="#"><i id="twitter" class="fab fa-twitter fa-2x"></i></a>
          <a target="_blank" href="#"><i id="instagram" class="fab fa-instagram fa-2x"></i></a>
        </div>

        <h3>Пишете ми</h3>
        <form action="https://formsubmit.co/9f4fb3c09df017d549548c4a04327a34" id="contact-form" method="POST"
          class="quote">
          <div>
            <input id="form-name" type="text" name="name" placeholder="Вашето име" required>
          </div>
          <div>
            <input id="form-email" type="email" name="email" placeholder="Електронен адрес" required>
          </div>
          <div>
            <textarea id="form-message" name="message" placeholder="Съобщение" required></textarea>
          </div>
          <input type="hidden" name="_template" value="box">
          <input type="text" name="_honey" style="display:none">
          <button class="post-button" type="submit">Изпрати</button>
        </form>
      </div>

      <h4 class="news">
        <i class="fas fa-feather-alt fa-2px"></i> Последни новини
      </h4>

      <div id="book-cover">
        <h1>Магесница<br>Вече в продажба</h1>
        <img src="images/book-cover.png" alt="Magesnitza Book">
        <a href="#" class="btn primary-btn">Поръчай сега</a>
      </div>
    </aside>
  </div>
</section>`;

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
  footerPageBg();
}