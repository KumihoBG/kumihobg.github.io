import { html, render } from 'https://unpkg.com/lit-html?module';

export const footerTemplate = (onSubscribe) => html`  
<!--Footer-->
<footer>
  <div class="footer-container">
    <div id="newsletter">
      <h1>Join Kumiho's mailing list</h1>
      <p>Sign up today to receive the latest news, events, sales, and more via email.</p>
      <form @submit=${onSubscribe} action="#" id="subsFrm" method="post">
        <input type="text" id="newsletter-name" placeholder="Full Name"
          name="newsletter-name"><br>
        <input type="email" id="newsletter-email" placeholder="Email"
          name="newsletter-email">
        <button type="submit" id="subscribeBtn">Subscribe</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <small>Copyright &copy; 2020 | Designed by<a href="https://github.com/KumihoBG" target="_blank">@Kumiho
      </a><img src="./images/kumiho.png">All rights reserved</small>
    <small><a href="http://www.freepik.com">Designed by brgfx / Freepik</a></small>
  </div>
</footer>`;

export async function footerPage() {
  let container = document.getElementById('footer-content');
  render(footerTemplate(onSubscribe), container);
  const subsFrm = document.getElementById('subsFrm');

  async function onSubscribe() {
      const formData = new FormData(subsFrm);
      const newsletterName = formData.get('newsletter-name');
      const newsletterEmail = formData.get('newsletter-email');
      if (newsletterName === '' || newsletterName === undefined
        || newsletterEmail === '' || newsletterEmail === undefined) {
        notify('Name and email are required!');
        return;
      }
  
      const Subscriber = Parse.Object.extend('Subscriber');
      const query = new Parse.Query(Subscriber);
      // You can also query by using a parameter of an object
      query.equalTo('email', newsletterEmail);
      const results = await query.find();
      try {
        const results = await query.find();
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          const name = object.get('name')
          const email = object.get('email')
          if (email === newsletterEmail) {
            return notify('This email is already subscribed to our newsletter. Thank you :)');
          }
        }
        const myNewObject = new Parse.Object('Subscriber');
        myNewObject.set('name', newsletterName);
        myNewObject.set('email', newsletterEmail);
        try {
          const result = await myNewObject.save();
          // Access the Parse Object attributes using the .GET method
          notify('Thank you for your subscription!')
          console.log('Subscriber created', result);
          document.getElementById('newsletter-name').value = '';
          document.getElementById('newsletter-email').value = '';
        } catch (error) {
          notify('Something went wrong!')
          console.error('Error while creating Subscriber: ', error);
        }
      } catch (error) {
        console.error('Error while fetching Subscriber', error);
      }
  }
}