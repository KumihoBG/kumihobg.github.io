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
export const passwordReset = api.passwordReset;
export const changePassword = api.changePassword;

// Implement application specific requests
export async function getCurrentUser() {
    return await api.getRequest(host + '/users/me');
}