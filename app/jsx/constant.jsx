export const BASE_URL = 'http://localhost:3000';
export const SIGN_UP_URL = '/signup';
export const SIGN_IN_URL = BASE_URL + '/login';
export const USER_INFO_URL = BASE_URL + '/users/';
export const CURRENT_USER_INFO_URL = BASE_URL + '/my-profile';
export const GROUPS_URL = BASE_URL + '/groups/';
export const NEW_GROUP_URL = BASE_URL + '/new-group';
export const RESTAURANTS_URL = BASE_URL + '/restaurants/';
export const NEW_RESTAURANT_URL = BASE_URL + '/new-restaurant'
export const API_USER_INFO_URL = BASE_URL + '/api/users/';
export const API_SIGN_UP_URL = BASE_URL + '/api/sign_up';
export const API_USER_UPDATE_URL = BASE_URL + '/api/users/';
export const API_SIGN_IN_URL = BASE_URL + '/api/sign_in';
export const API_SIGN_OUT_URL = BASE_URL + '/api/sign_out';
export const API_NEW_RESTAURANT_URL = BASE_URL + 'api/restaurants/new';
export const API_RESTAURANTS_URL = BASE_URL + '/api/restaurants/';
export const API_GROUPS_URL = BASE_URL + '/api/groups';
export const API_NEW_GROUP_URL = BASE_URL + '/api/groups/new';
export const API_JOIN_URL = '/group_users/'
export const marker_types = {
  user: 'user_marker',
  group: 'group_marker',
  restaurant: 'restaurant_marker'
}

let header = {}

if (localStorage.feastival_user != null) {
  header = {
    headers: {
      'USER-TOKEN': JSON.parse(localStorage.feastival_user).USER_TOKEN
    }
  }
}

export const headers = header;
export const DEFAULT_AVATAR = 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg';
let alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}
export const ALERT_OPTIONS = alertOptions;

let config_firebase = {
  apiKey: "AIzaSyCOJT76DNusqTAFJbJpqUtR5L8VTQsLvkU",
  authDomain: "secure-site-174215.firebaseapp.com",
  databaseURL: "https://secure-site-174215.firebaseio.com",
  projectId: "secure-site-174215",
  storageBucket: "secure-site-174215.appspot.com",
  messagingSenderId: "320676314657"
};
export const CONFIG_FIREBASE = config_firebase;
