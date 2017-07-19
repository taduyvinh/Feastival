export const BASE_URL = 'http://localhost:3000'
export const SIGN_IN_URL = BASE_URL + '/login'
export const USER_INFO_URL = BASE_URL + '/users/'
export const API_USER_INFO_URL = BASE_URL + '/api/users/'
export const API_SIGN_IN_URL = BASE_URL + '/api/sign_in'
export const API_SIGN_OUT_URL = BASE_URL + '/api/sign_out'

let header = {}
if (localStorage.festival_user != null) {
  header = {
    headers: {
      'USER-TOKEN': JSON.parse(localStorage.festival_user).USER_TOKEN
    }
  }
}

export const headers = header
export const DEFAULT_AVATAR = 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg'
