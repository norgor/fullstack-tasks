import axios from "axios"

export function doLogin(loginRequest) {
  return axios.post(`http://localhost:8085/demo/login`, loginRequest).then(resonse => {
    return resonse.data;
  });
}

export function doRegister(registerRequest) {
  return axios.post(`http://localhost:8085/demo/register`, registerRequest)
    .then(response => response.data);
}