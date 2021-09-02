import { html } from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from '../../index.js';
import { validateChangedPassword } from '../../services/validator.js';
import { changePassword, logout } from '../api/data.js';
import { navTemplate, setUserNav } from "./navigation.js";
import { notify } from './notification.js';
import { toggleEye } from '../../index.js';

const profileTemplate = (onChange, getUserName, getUserEmail, onDelete) => html`
${navTemplate()}
<section id="profile-page">
  <div id=user>
    <div id="user-image-container">
      <i class="fas fa-camera fa-2x"></i>
      <img id="user-image" src="../images/user.png">
      <h3>Hello, <span id="username-style">${getUserName()}</span></h3>
    </div>
  </div>
  <div id="user-details">
    <h2>Account details:</h2>
    <ul>
      <li><i class="fas fa-user-circle"></i> Username: ${getUserName()}</li>
      <li><i class="fas fa-envelope-square"></i> Email: ${getUserEmail()} </li>
    </ul>
    <h3>Change your current password:</h3>
    <div class="new-pass-container">
      <div id="new-pass-info-container">
        <p><i class="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password
          must consist only of letters and at least 2 digits.</p>
      </div>
      <label for="new-password">New password:</label>
      <div class="icon">
        <i class="fas fa-lock"></i>
        <input id="new-password" type="password" name="change-password" autocomplete="password"><br>
        <i id="eye-four" class="fas fa-eye" class="togglePassword"></i>
      </div>
      <label for="repeat-password">Repeat password:</label>
      <div class="icon">
        <i class="fas fa-lock"></i>
        <input id="repeat-password" type="password" name="change-password" autocomplete="current-password"><br>
        <i id="eye-five" class="fas fa-eye"></i>
      </div>
      <button @click=${onChange} type="button" id="submitNewPass" name="submitNewPass">Change Password</button>

      <h3>Delete account:</h3>

      <button @click=${onDelete} type="button" id="deleteAccount" name="deleteAccount">Delete account</button>
    </div>
  </div>
  </div>

</section>`;

export async function profilePage(context) {
  context.render(profileTemplate(onChange, getUserName, getUserEmail, onDelete));
  setUserNav();
  toggleEye();

  async function onChange(event) {
    event.preventDefault();
    const currentUser = Parse.User.current();
    const id = currentUser.id;
    const newPassword = document.getElementById('new-password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const result = await validateChangedPassword(newPassword, repeatPassword);
    if (result == true) {
      await changePassword(id, newPassword);
      page.redirect('/login');
    }
  }

  function getUserName() {
    const userName = localStorage.getItem('username');
    return userName;
  }

  function getUserEmail() {
    const email = localStorage.getItem('email');
    return email;
  }

  async function onDelete() {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    try {
      const currentUser = Parse.User.current();
      const id = currentUser.id;
      let user = await query.get(id);
      var confirmDeletion = confirm("Are you sure you want to delete your account?");
      if (confirmDeletion) {
        try {
          // Invokes the "destroy" method to delete the user
          Parse.User.logOut();
          await logout();
          let response = await user.destroy();
          console.log('Deleted user', response);
          notify('Your account was successfully deleted. Sorry to see you go :( ');
          page.redirect('/home');
        } catch (error) {
          notify(error);
          console.error('Error while deleting user', error);
        }
      }
    } catch (error) {
      notify(error);
      console.error('Error while retrieving user', error);
    }
  }

  logoutEvent();
}

