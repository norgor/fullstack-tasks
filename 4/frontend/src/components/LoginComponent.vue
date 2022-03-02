<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <input id="usernameInput" type="text" v-model="username" />
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <input id="passwordInput" type="password" v-model="password" />
      <button id="signInButton" v-on:click="handleClickSignin_2">
        Sign in
      </button>
      <label id="loginstatusLabel">{{ loginStatus }}</label>
    </div>
  </div>
</template>


<script>
import { doLogin } from "@/utils/apiutil.js";

export default {
  name: "LoginComponent",
  methods: {
    async handleClickSignin() {
      //alert("You entered, username: " + this.username);
      const loginRequest = { username: this.username, password: this.password };
      const loginResponse = await doLogin(
        "http://localhost:8085/demo/login",
        loginRequest
      );
      console.log(loginResponse);
      alert("Login: " + loginResponse.data.loginStatus);
    },
    async handleClickSignin_2() {
      const loginRequest = { username: this.username, password: this.password };
      try {
        const loginResponse = await doLogin(loginRequest);
        const loginStatus = loginResponse.loginStatus;
        this.loginStatus = loginStatus;
        if (loginStatus === "Success") {
          this.$store.dispatch("setAuthUsername", loginRequest.username);
          this.$emit("success");
        } else {
          this.$emit("failure");
        }
      } catch (e) {
        this.loginStatus = "Unable to submit your information.";
        throw e;
      }
    },
  },
  data() {
    return {
      username: "",
      password: "",
      loginStatus: "",
    };
  },
};
</script>

<style scoped>
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#loginTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#username,
#password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
}

#usernameLabel,
#passwordLabel {
  width: 100px;
}
</style>
