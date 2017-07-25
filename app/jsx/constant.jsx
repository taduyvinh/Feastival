export const BASE_URL = 'http://localhost:3000';
export const SIGN_UP_URL = '/signup';
export const SIGN_IN_URL = BASE_URL + '/login';
export const USER_INFO_URL = BASE_URL + '/users/';
export const CURRENT_USER_INFO_URL = BASE_URL + '/my-profile';
export const API_USER_INFO_URL = BASE_URL + '/api/users/';
export const API_SIGN_UP_URL = BASE_URL + '/api/sign_up';
export const API_USER_UPDATE_URL = BASE_URL + '/api/users/';
export const API_SIGN_IN_URL = BASE_URL + '/api/sign_in';
export const API_SIGN_OUT_URL = BASE_URL + '/api/sign_out';
export const API_RESTAURANTS_URL = BASE_URL + '/api/restaurants';

let header = {}
if (localStorage.feastival_user != null) {
  header = {
    headers: {
      'USER-TOKEN': JSON.parse(localStorage.feastival_user).USER_TOKEN
    }
  }
}

export const headers = header
export const DEFAULT_AVATAR = 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg'
