import { html } from 'https://unpkg.com/lit-html?module';

export const footerTemplate = () => html`  
<!--Footer-->
<footer>
  <div class="footer-container">
    <div id="newsletter">
      <h1>Join Kumiho's mailing list</h1>
      <p>Sign up today to receive the latest news, events, sales, and more via email.</p>
      <form action="#" id="subsFrm" method="post">
        <input type="text" id="newsletter-name" placeholder="Full Name"
          name="newsletter-name"><br>
        <input type="email" id="newsletter-email" placeholder="Email"
          name="newsletter-email">
        <a href="" class="subscribeBtn" name="subscribeBtn">Subscribe</a>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Designed by<a href="https://github.com/KumihoBG" target="_blank">@Kumiho
      </a><img src="./images/kumiho.png">All rights reserved</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;