import { html } from "../../node_modules/lit-html/lit-html.js";

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

    <div class="search">
      <label>Search this website</label>
      <i class="fas fa-search fa-1x"></i><input class="search-field" type="search" name="search"
        placeholder="Search this website...">
      <br>
      <div id="icons-container">
        <a target="_blank" href="#"><i id="facebook" class="fab fa-facebook fa-2x"></i></a><a target="_blank"
          href="#"><i id="twitter" class="fab fa-twitter fa-2x"></i></a>
        <a target="_blank" href="#"><i id="instagram" class="fab fa-instagram fa-2x"></i></a>
      </div>
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

    <div class="search">
      <label>Търси в сайта</label>
      <i class="fas fa-search fa-1x"></i><input class="search-field" type="search" name="search"
        placeholder="Потърси в уебсайта...">
      <br>
      <div id="icons-container">
        <a target="_blank" href="#"><i id="facebook" class="fab fa-facebook fa-2x"></i></a><a target="_blank"
          href="#"><i id="twitter" class="fab fa-twitter fa-2x"></i></a>
        <a target="_blank" href="#"><i id="instagram" class="fab fa-instagram fa-2x"></i></a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Дизайн <a href="https://github.com/KumihoBG" target="_blank">@Kumiho
        </a><img src="./images/kumiho.png"> Всички права запазени</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;