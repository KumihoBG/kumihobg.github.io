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
export const resetPass = api.passwordReset;

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