import { html } from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from '../../index.js';
import { validateAddress, validateChangedPassword, validatePhone } from '../../services/validator.js';
import { changePassword, logout } from '../api/data.js';
import { navTemplate, setUserNav } from "./navigation.js";
import { notify } from './notification.js';
import { toggleEye } from '../../index.js';

const profileTemplate = (onChange, getUserName, getUserEmail, onDelete, onEditAddress, onEditPhone, userAddress, phone) => html`
${navTemplate()}
<div id="profile-header">
  <img src="../images/profile-bg.jpg" alt="profile-header">
</div>
<section id="profile-page">
  <div id="left-container">
    <div id=user>
      <div id="user-image-container">
        <i class="fas fa-camera fa-2x"></i>
        <img id="user-image" src="../images/user.png">
        <h3 id="username-style">${getUserName()}</h3>
      </div>
    </div>
    <div id="user-details">
      <h2>Account details:</h2>
      <ul>
        <li><i class="fas fa-user-circle"></i> Username: ${getUserName()}</li>
        <li><i class="fas fa-envelope-square"></i> Email: ${getUserEmail()} </li>
        <li><i class="fas fa-phone-square-alt"></i> Phone: ${phone}</li>
        <li><i class="fas fa-map-marked"></i> Address: ${userAddress}</li>
      </ul>
    </div>
  </div>
  </div>
  </div>
  <div id="right-container">
    <h2>Account Actions:</h2>
    <h3><i class="fas fa-check-double"></i> Change your current password:</h3>
    <div class="new-pass-container">
      <div id="new-pass-info-container">
        <p><i class="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password
          must consist only of letters and at least 2 digits.</p>
      </div>
      <form id="profile-form" action="#" method="post">
        <input hidden id="username-hidden" name="username-hidden" type="text" autocomplete="username"
          value=${getUserName()}>
        <label for="new-password">New password:</label>
        <div class="icon">
          <i class="fas fa-lock"></i>
          <input id="new-password" type="password" name="change-password" autocomplete="password"><br>
          <i id="eye-four" class="fas fa-eye" class="togglePassword"></i>
        </div>
        <br>
        <label for="repeat-password">Repeat password:</label>
        <div class="icon">
          <i class="fas fa-lock"></i>
          <input id="repeat-password" type="password" name="change-password" autocomplete="current-password"><br>
          <i id="eye-five" class="fas fa-eye"></i>
        </div>
        <button @click=${onChange} type="button" id="submitNewPass" name="submitNewPass">Change Password</button>
      </form>
      <br>
      <h3><i class="fas fa-check-double"></i> Add phone number:</h3>
      <label for="phone">Your current phone number:</label>
      <input type="text" name="phone" id="phone" autocomplete="phone"><br>
      <button @click=${onEditPhone} type="button" id="editPhone" name="editPhone">Edit Phone</button><br>
      <h3><i class="fas fa-check-double"></i> Add your address:</h3>
      <label for="address">Your current address:</label>
      <input type="text" name="address" id="address" autocomplete="address"><br>
      <button @click=${onEditAddress} type="button" id="editPhone" name="editPhone">Edit Address</button><br>
      <h3><i class="fas fa-check-double"></i> Delete account:</h3>
      <p>If you no longer want to be a member of this community, press the button below.</p>
      <button @click=${onDelete} type="button" id="deleteAccount" name="deleteAccount">Delete account</button>
    </div>

</section>`;

export async function profilePage(context) {
  const userAddress = await getUserAddress();
  const phone = await getUserPhone();
  const notifications = document.getElementById('notifications');
  context.render(profileTemplate(onChange, getUserName, getUserEmail, onDelete, onEditAddress, onEditPhone, userAddress, phone));
  setUserNav();
  toggleEye();

  async function onChange(event) {
    event.preventDefault();
    const currentUser = Parse.User.current();
    const id = currentUser.id;
    const newPassword = document.getElementById('new-password').value.trim();
    const repeatPassword = document.getElementById('repeat-password').value.trim();
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

  async function getUserAddress() {
    const currentUser = Parse.User.current();
    const currentUserAddress = currentUser.get('address');
    return currentUserAddress;
  }

  async function getUserPhone() {
    const currentUser = Parse.User.current();
    const currentUserPhone = currentUser.get('phone');
    return currentUserPhone;
  }

  async function onDelete() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      const currentUser = Parse.User.current();
      const id = currentUser.id;
      let user = await query.get(id);
      if (user.id === id) {
        var confirmDeletion = confirm("Are you sure you want to delete your account?");
        if (confirmDeletion) {
          try {
            // Invokes the "destroy" method to delete the user
            let response = await user.destroy();
            notifications.style.display = "block";
            notify('Your account was successfully deleted. Sorry to see you go :( ');
            await logout();
          } catch (error) {
            notifications.style.display = "block";
            notify(error);
            console.error('Error while deleting user', error);
          }
        }
      }
    } catch (error) {
      notifications.style.display = "block";
      notify(error);
      console.error('Error while retrieving user', error);
    }
  }

  async function onEditPhone() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      // Finds the user by its ID
      const currentUser = Parse.User.current();
      const id = currentUser.id;
      let user = await query.get(id);
      // Updates the data we want
      let phone = document.getElementById('phone').value;
      phone.trim();
      let phoneToSafe = validatePhone(phone);
  
      if (phoneToSafe !== undefined) {
        user.set('phone', phone);
        phone = '';
      } 

      try {
        // Saves the user with the updated data
        let response = await user.save();
        notifications.style.display = "block";
        notify('You have updated your personal information successfully! Thank you :)');
        page.redirect('/profile');
      } catch (error) {
        notifications.style.display = "block";
        notify('Error while updating user', error);
        console.error('Error while updating user', error);
      }
    } catch (error) {
      console.error('Error while retrieving user', error);
      notifications.style.display = "block";
      notify('Error while retrieving user', error);
    }
  }

  async function onEditAddress() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      // Finds the user by its ID
      const currentUser = Parse.User.current();
      const id = currentUser.id;
      let user = await query.get(id);
      // Updates the data we want
      let address = document.getElementById('address').value;
      address.trim();
      let addressToSave = validateAddress(address);
      if (addressToSave !== undefined) {
        user.set('address', addressToSave);
        address = '';
      }

      try {
        // Saves the user with the updated data
        let response = await user.save();
        notifications.style.display = "block";
        notify('You have updated your personal information successfully! Thank you :)');
        page.redirect('/profile');
      } catch (error) {
        notifications.style.display = "block";
        notify('Error while updating user', error);
        console.error('Error while updating user', error);
      }
    } catch (error) {
      console.error('Error while retrieving user', error);
      notifications.style.display = "block";
      notify('Error while retrieving user', error);
    }
  }
  logoutEvent();
}

