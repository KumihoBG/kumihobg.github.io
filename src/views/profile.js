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
  <img id="header-image" src="" alt="profile-header">
  <form class="upload-form">
    <label for="upload-header">
      <i id="header-upload-one" class="fas fa-camera fa-2x"></i>
      <input type="file" id="upload-header" name="upload" style="display:none" accept="image/*" visibility="none">
    </label>
  </form>
</div>
<section id="profile-page">
  <div id="left-container">
    <div id=user>
      <div id="user-image-container">
        <form class="upload-form">
          <label for="upload">
            <i id="header-upload-two" class="fas fa-camera fa-2x"></i>
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
    <div class="new-pass-container">
      <div class="wrapper">
        <h3><i class="fas fa-check-double"></i> If you wish to change your current password, please fill in the new
          password. Repeat it to make sure there is no error and click the button in the box below:</h3>
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
      </div>
      <div class="wrapper">
        <h3><i class="fas fa-check-double"></i> Add phone number:</h3>
        <label for="phone">If you would like to add your current phone number to your account, please fill in the field
          and click the button below:</label>
        <input type="text" name="phone" id="phone" autocomplete="phone" placeholder="Phone number"><br>
        <button @click=${onEditPhone} type="button" id="editPhone" name="editPhone">Edit Phone</button><br>
      </div>
      <div class="wrapper">
        <h3><i class="fas fa-check-double"></i> Add your address:</h3>
        <label for="address">If you would like to add your current address to your account, please fill in the field and
          click the button below:</label>
        <input type="text" name="address" id="address" autocomplete="address" placeholder="Address"><br>
        <button @click=${onEditAddress} type="button" id="editPhone" name="editPhone">Edit Address</button><br>
      </div>
      <div class="wrapper">
        <h3><i class="fas fa-check-double"></i> Delete account:</h3>
        <p>If you don't want to be part of our community anymore, click the button below. Please note that once deleted,
          your account information cannot be recovered and you will need to re-register.</p>
        <button @click=${onDelete} type="button" id="deleteAccount" name="deleteAccount">Delete account</button>
      </div>
    </div>
</section>`;

export async function profilePage(context) {
  const userAddress = await getUserAddress();
  const phone = await getUserPhone();
  const notifications = document.getElementById('notifications');
  context.render(profileTemplate(onChange, getUserName, getUserEmail, onDelete, onEditAddress, onEditPhone, userAddress, phone));
  setUserNav();
  toggleEye();

  let upload = document.getElementById('upload');
  upload.addEventListener("change", handleFiles, false);
  let uploadHeader = document.getElementById('upload-header');
  uploadHeader.addEventListener('change', handleHeaders, false);

  let userImage = document.getElementById('user-image');
  let headerImage = document.getElementById('header-image');

  const currentUser = Parse.User.current();
  const currentUserImage = currentUser.get('image');
  const currentUserHeader = currentUser.get('headerImg');

  if (currentUserImage === undefined || currentUserImage === null || currentUserHeader === undefined || currentUserHeader === null) {
    userImage.src = "../images/user.png";
    headerImage.src = "../images/profile-bg.jpg";
  } else if (currentUserImage.url) {
    userImage.src = currentUserImage.url();
  } else if (currentUserHeader.url) {
    headerImage.src = currentUserHeader.url();
  }

  userImage.src = refreshImage('user-image', currentUserImage.url());
  headerImage.src = refreshImage('header-image', currentUserHeader.url());

  function refreshImage(imgElement, imgURL) {
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
        var confirmDeletion = confirm("Are you sure you want to delete your account?");
        if (confirmDeletion) {
          try {
            // Invokes the "destroy" method to delete the user
            let response = await user.destroy();
            notifications.style.display = "block";
            await logout();
            notify('Your account was successfully deleted.');
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
        notify('You have updated your personal information successfully.');
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
        notify('You have updated your personal information successfully.');
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
            notify('You have updated your personal information successfully.');
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

  async function handleHeaders(e) {
    e.preventDefault();
    const fileList = this.files;
    //define the width to resize e.g 600px
    let resizeWidth = 1500;//without px
    let resizeHeigh = 500;

    //get the image selected
    const item = fileList[0];
    const imgSize = item.size;

    if (item.type.indexOf("image") == -1) {
      notify("File not supported");
      return;
    }

    if (imgSize > 2000000) {
      notify("Image too big (max 2Mb)");
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
        elem.height = resizeHeigh;

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
          currentUser.set('headerImg', file);

          try {
            // Saves the user with the updated data
            let response = await currentUser.save();
            notifications.style.display = "block";
            notify('You have updated your personal information successfully.');
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

