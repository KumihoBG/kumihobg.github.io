import { notify } from "../views/notification.js";
import * as api from "./api.js";

Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize(
    'uegeatzbbxvS84ZmnkwKVYMFKIp2s418DRhS60hb', // This is your Application ID
    'vRwJjNmYUdA58NSoeBEk9eFl07VsdQMNUOMIGGpN', // This is your Javascript key
  );

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application specific requests
export async function getAllItems() {
    return await api.getRequest(host + '/data/cars?sortBy=_createdOn%20desc');
}

export async function getSingleItem(id) {
    return await api.getRequest(host + '/data/cars/' + id);
}

export async function getMyItem() {
    const userId = localStorage.getItem('userId');
    return await api.getRequest(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(data) {
    return await api.postRequest(host + '/data/cars', data);
}

export async function editItem(id, data) {
    return await api.putRequest(host + `/data/cars/${id}`, data);
}

export async function deleteItem(id) {
    return await api.deleteRequest(host + `/data/cars/${id}`);
}

export async function passwordReset(email) {
    try {
        // Pass the username and password to logIn function
        await api.postRequest(host + '/requestPasswordReset', email);
        // Password reset request was sent successfully
        notify('Reset password email sent successfully');
      } catch (error) {
        console.error('Error while creating request to reset user password', error);
        notify('Error while creating request to reset user password', error);
      }
}