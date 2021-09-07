import {html} from 'https://unpkg.com/lit-html?module';

export const footerTemplate = () => html`  
<!--Footer-->
<footer>
  <div class="footer-container">
    <div id="newsletter">
      <h1>Join Kumiho's mailing list</h1>
      <p>Sign up today to receive the latest news, events, sales, and more via email.</p>
      <form class="newsletter__form js-newsletter-form" action="#" id="subsFrm" method="post">
        <input class="newsletter__form-input" type="text" id="newsletter-name" placeholder="Full Name" name="newsletter-name" required><br>
        <input class="newsletter__form-input" type="email" id="newsletter-email" placeholder="Email" name="newsletter-email" required>
        <a id="subscribeBtn" name="subscribeBtn">Subscribe</a>
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
        <input class="newsletter__form-input" type="text" id="newsletter-name-bg" placeholder="Въведи име" name="newsletter-name-bg" autocomplete="name" required><br>
        <input class="newsletter__form-input" type="email" id="newsletter-email-bg" autocomplete="email" placeholder="Въведи e-mail" name="newsletter-email-bg" required>
        <a id="subscribeBtnBg" name="subscribeBtnBg">Запиши се</a>
      </form>
    </div>
  </div>

  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Дизайн <a href="https://github.com/KumihoBG" target="_blank">@Kumiho
        </a><img src="./images/kumiho.png"> Всички права запазени</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;