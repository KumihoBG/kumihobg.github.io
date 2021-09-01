import { html } from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from '../../index.js';
import { changePassword } from '../api/data.js';
import { navTemplate, setUserNav } from "./navigation.js";

const profileTemplate = (onChange) => html`
${navTemplate()}
<section id="profile-page">
  <div class="container">
    <label for="old-password">Current password:</label>
    <input id="old-password" name="change-password" placeholder="Old password" autocomplete="current-password">
    <label for="new-password">New password:</label>
    <input id="new-password" name="change-password" placeholder="New password" autocomplete="password">
    <button @click=${onChange} type="button" id="submitNewPass" name="submitNewPass">Change Password</button>
  </div>
  </div>
</section>`;

export async function profilePage(context) {
  context.render(profileTemplate(onChange));
  setUserNav();

  async function onChange(event) {
    event.preventDefault();
    const currentUser = Parse.User.current();
    const id = currentUser.id;
    const newPassword = document.getElementById('new-password').value;
    await changePassword(id, newPassword);
    logoutEvent();
    page.redirect('/login');
  }
  logoutEvent();
}

