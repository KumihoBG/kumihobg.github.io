import { html, render } from 'https://unpkg.com/lit-html?module';
import { notify } from './notification.js';

export const footerTemplateBg = (onSubscribeBg) => html`  
<!--Footer-->
<footer>
  <div class="footer-container">
    <div id="newsletter-bg">
      <h1>Присъединете се<br>към електронния бюлетин на Kumiho</h1>
      <p>Регистрирайте се днес, за да получавате по електронната си поща последните новини, събития, нови продажби и
        други.</p>
      <form @submit=${onSubscribeBg} action="#" id="subsFrmBg" method="">
        <input type="text" id="newsletter-name-bg" placeholder="Вашето име"
          name="newsletter-name-bg"><br>
        <input type="email" id="newsletter-email-bg" placeholder="Електронен адрес"
          name="newsletter-email-bg">
          <button type="submit" id="subscribeBtnBg">Абонирай се</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Дизайн <a href="https://github.com/KumihoBG" target="_blank">@Kumiho
      </a><img src="./images/kumiho.png"> Всички права запазени</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;

export async function footerPageBg() {
  let container = document.getElementById('footer-content');
  render(footerTemplateBg(onSubscribeBg), container);
  const subsFrmBg = document.getElementById('subsFrmBg');

  async function onSubscribeBg(event) {
  event.preventDefault();
    const formData = new FormData(subsFrmBg);
    const newsletterNameBg = formData.get('newsletter-name-bg');
    const newsletterEmailBg = formData.get('newsletter-email-bg');
    if (newsletterNameBg === '' || newsletterNameBg === undefined
      || newsletterEmailBg === '' || newsletterEmailBg === undefined) {
      notify('Name and email are required!');
      return;
    }

    const Subscriber = Parse.Object.extend('Subscriber');
    const query = new Parse.Query(Subscriber);
    // You can also query by using a parameter of an object
    query.equalTo('email', newsletterEmailBg);
    const results = await query.find();
    try {
      const results = await query.find();
      for (const object of results) {
        // Access the Parse Object attributes using the .GET method
        const name = object.get('name')
        const email = object.get('email')
        if (email === newsletterEmailBg) {
          return notify('This email is already subscribed to our newsletter. Thank you :)');
        }
      }
      const myNewObject = new Parse.Object('Subscriber');
      myNewObject.set('name', newsletterNameBg);
      myNewObject.set('email', newsletterEmailBg);
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        notify('Thank you for your subscription!')
        console.log('Subscriber created', result);
        document.getElementById('newsletter-name-bg').value = '';
        document.getElementById('newsletter-email-bg').value = '';
      } catch (error) {
        notify('Something went wrong!')
        console.error('Error while creating Subscriber: ', error);
      }
    } catch (error) {
      console.error('Error while fetching Subscriber', error);
    }
  }
}