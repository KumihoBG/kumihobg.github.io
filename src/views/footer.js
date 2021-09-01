import {html} from 'https://unpkg.com/lit-html?module';

export const footerTemplate = () => html`  
<!--Footer-->
<footer>
  <div class="footer-container">
    <div id="newsletter">
      <h1>Join Kumiho's mailing list</h1>
      <p>Sign up today to receive the latest news, events, sales, and more via email.</p>
      <form class="newsletter__form js-newsletter-form" action="#" id="subsFrm" method="post">
        <input class="newsletter__form-input" type="text" id="name" placeholder="Full Name..." required=""><br>
        <input class="newsletter__form-input" type="email" id="email" placeholder="Email...">
        <a id="subscribeBtn" name="subscribeBtn" value="Subscribe Now">Subscribe</a>
        <div id="state"></div>
        <div id="error"></div>
        <div id="fail"></div>
      </form>
    </div>
  </div>

  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Designed by<a href="https://github.com/KumihoBG" target="_blank">@Kumiho
      </a><img src="./images/kumiho.png">All rights reserved</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;

export const footerTemplateBg = () => html`  
<!--Footer-->
<footer>
  <div class="footer-container">
    <div id="newsletter">
      <h1>Присъединете се<br>към пощенския списък на Kumiho</h1>
      <p>Регистрирайте се днес, за да получавате по електронната си поща последните новини, събития, нови продажби и
          други.</p>
      <form class="newsletter__form js-newsletter-form" action="#" id="subsFrm" method="post">
        <input class="newsletter__form-input" type="text" id="name" placeholder="Въведи име..." required=""><br>
        <input class="newsletter__form-input" type="email" id="email" placeholder="Въведи e-mail...">
        <a id="subscribeBtn" name="subscribeBtn" value="Subscribe Now">Запиши се</a>
        <div id="state"></div>
        <div id="error"></div>
        <div id="fail"></div>
      </form>
    </div>
  </div>

  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Дизайн <a href="https://github.com/KumihoBG" target="_blank">@Kumiho
        </a><img src="./images/kumiho.png"> Всички права запазени</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;