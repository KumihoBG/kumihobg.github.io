import { html } from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from '../../index.js';
import { validateAddress, validateChangedPassword, validatePhone } from '../../services/validator.js';
import { changePassword, logout } from '../api/data.js';
import { navTemplate, setUserNav } from "./navigation.js";
import { notify } from './notification.js';
import { toggleEye } from '../../index.js';

const profileTemplateBg = (onChange, getUserName, getUserEmail, onDelete, onEditAddress, onEditPhone, userAddress, phone) => html`
${navTemplate()}
<div id="profile-header">
  <img src="../images/profile-bg.jpg" alt="profile-header">
</div>
<section id="profile-page">
  <div id="left-container">
    <div id=user>
      <div id="user-image-container">
      <form id="upload-form">
          <label for="upload">
            <i class="fas fa-camera fa-2x"></i>
            <input type="file" id="upload" name="upload" style="display:none" accept="image/*" visibility="none">
          </label>
        </form>
        <div id="picture-container">
          <img id="user-image" src="">
        </div>
        <h3 id="username-style">${getUserName()}</h3>
      </div>
    </div>
    <div id="user-details">
      <h2>Account details:</h2>
      <ul>
        <li><i class="fas fa-user-circle"></i> Потребителско име: ${getUserName()}</li>
        <li><i class="fas fa-envelope-square"></i> Електронна поща: ${getUserEmail()} </li>
        <li><i class="fas fa-phone-square-alt"></i> Телефонен номер: ${phone}</li>
        <li><i class="fas fa-map-marked"></i> Адрес: ${userAddress}</li>
      </ul>
    </div>
  </div>
  </div>
  </div>
  <div id="right-container">
    <h2>Account Actions:</h2>
    <h3><i class="fas fa-check-double"></i> Сменете Вашата парола:</h3>
    <div class="new-pass-container">
      <div id="new-pass-info-container">
        <p><i class="fas fa-info-circle"></i> Паролата Ви трябва да бъде дълга между 6 и 10 знака. Тя може да съдържа само букви и поне 2 цифри.</p>
      </div>
      <form id="profile-form" action="#" method="post">
        <input hidden id="username-hidden" name="username-hidden" type="text" autocomplete="username"
          value=${getUserName()}>
        <label for="new-password">Нова парола:</label>
        <div class="icon">
          <i class="fas fa-lock"></i>
          <input id="new-password" type="password" name="change-password" autocomplete="password"><br>
          <i id="eye-four" class="fas fa-eye" class="togglePassword"></i>
        </div>
        <br>
        <label for="repeat-password">Повторете паролата:</label>
        <div class="icon">
          <i class="fas fa-lock"></i>
          <input id="repeat-password" type="password" name="change-password" autocomplete="current-password"><br>
          <i id="eye-five" class="fas fa-eye"></i>
        </div>
        <button @click=${onChange} type="button" id="submitNewPass" name="submitNewPass">Смени парола</button>
      </form>
      <br>
      <h3><i class="fas fa-check-double"></i> Добавете телефонен номер:</h3>
      <label for="phone">Вашият настоящ телефонен номер:</label>
      <input type="text" name="phone" id="phone" autocomplete="phone"><br>
      <button @click=${onEditPhone} type="button" id="editPhone" name="editPhone">Добави телефонен номер</button><br>
      <h3><i class="fas fa-check-double"></i> Add your address:</h3>
      <label for="address">Вашият настоящ адрес:</label>
      <input type="text" name="address" id="address" autocomplete="address"><br>
      <button @click=${onEditAddress} type="button" id="editPhone" name="editPhone">Добави адрес</button><br>
      <h3><i class="fas fa-check-double"></i> Изтрий своя акаунт:</h3>
      <p>Ако не искате да бъдете повече част от нашата общност, натиснете бутона по-долу.</p>
      <button @click=${onDelete} type="button" id="deleteAccount" name="deleteAccount">Изтрий акаунт</button>
    </div>
</section>`;

export async function profilePageBg(context) {
  const userAddress = await getUserAddress();
  const phone = await getUserPhone();
  const notifications = document.getElementById('notifications');
  context.render(profileTemplateBg(onChange, getUserName, getUserEmail, onDelete, onEditAddress, onEditPhone, userAddress, phone));
  setUserNav();
  toggleEye();

  let upload = document.getElementById('upload');
  upload.addEventListener("change", handleFiles, false);
  let userImage = document.getElementById('user-image');
  const currentUser = Parse.User.current();
  const currentUserImage = currentUser.get('image');
    if (currentUserImage === undefined || currentUserImage === null) {
      userImage.src = "../images/user.png";
    } else if (currentUserImage.url) {
      userImage.src = currentUserImage.url();
    }

    userImage.src = refreshImage('user-image', currentUserImage.url());

    function refreshImage(imgElement, imgURL){    
      let timestamp = new Date().getTime();  
      let el = document.getElementById(imgElement);  
      let queryString = "?t=" + timestamp;    
      el.src = imgURL + queryString; 
      return el.src;   
  }

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

  async function getCurrentUser() {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    const currentUser = Parse.User.current();
    const id = currentUser.id;
    let user = await query.get(id);
    return user;
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
    try {
      const id = localStorage.getItem('userId');
      let user = await getCurrentUser();
      if (user.id === id) {
        var confirmDeletion = confirm("Наистина ли искате да изтриете Вашия акаунт?");
        if (confirmDeletion) {
          try {
            // Invokes the "destroy" method to delete the user
            let response = await user.destroy();
            notifications.style.display = "block";
            await logout();
            notify('Вашият акаунт бе успешно изтрит.');
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
    try {
      // Finds the user by its ID
      let user = await getCurrentUser();
      // Updates the data we want
      let phone = document.getElementById('phone').value;
      phone.trim();
      let phoneToSave = validatePhone(phone);

      if (phoneToSave !== undefined) {
        user.set('phone', phone);
        phone = '';
      }

      try {
        // Saves the user with the updated data
        let response = await user.save();
        notifications.style.display = "block";
        notify('Успешно обновихте информацията за Вашия потребителски профил.');
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
    try {
      // Finds the user by its ID
      let user = await getCurrentUser();
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
        notify('Успешно обновихте информацията за Вашия потребителски профил.');
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

  async function handleFiles(e) {
    e.preventDefault();
    const fileList = this.files;
    //define the width to resize e.g 600px
    let resizeWidth = 180;//without px

    //get the image selected
    const item = fileList[0];
    const imgName = item.name;
    const imgSize = item.size;

    if (item.type.indexOf("image") == -1) {
      notify("File not supported");
      return;
    }

    if (imgSize > 1000000) {
      notify("Image too big (max 1Mb)");
      return;
    }
    //create a FileReader
    let reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
      let img = new Image();//create a image
      img.src = event.target.result;//result is base64-encoded Data URI
      img.name = event.target.name;//set name (optional)
      img.size = event.target.size;//set size (optional)
      img.onload = async function (el) {
        let elem = document.createElement('canvas');//create a canvas
        elem.width = resizeWidth;
        elem.height = resizeWidth;

        //draw in canvas
        let ctx = elem.getContext('2d');
        ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

        //get the base64-encoded Data URI from the resize image
        let srcEncoded = ctx.canvas.toDataURL('image/png', 1);

        //assign it to thumb src
        const userImage = document.getElementById('user-image');
        userImage.src = srcEncoded;
        /*Now you can send "srcEncoded" to the server and
        convert it to a png o jpg. Also can send
        "el.target.name" that is the file's name.*/
        try {
          // Finds the user by its ID
          // const User = new Parse.User();
          // const currentUser = Parse.User.current();
          // const id = currentUser.id;
          // Updates the data we want
          let currentUser = Parse.User.current();
          let file = new Parse.File(el.target.name, { base64: srcEncoded });
          file.save();
          currentUser.set('image', file);

          try {
            // Saves the user with the updated data
            let response = await currentUser.save();
            notifications.style.display = "block";
            notify('Успешно обновихте информацията за Вашия потребителски профил.');
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
    }
  }

  logoutEvent();
}

