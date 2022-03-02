<template>
  <div id="registerContainer">
    <div id="registerTitle">
      <label>Registration station</label>
    </div>
    <div class="row">
      <label>Email:</label>
      <input id="emailInput" type="text" v-model="email" />
    </div>
    <div class="row">
      <label>Username:</label>
      <input id="usernameInput" type="text" v-model="username" />
    </div>
    <div class="row">
      <label>Password: </label>
      <input id="passwordInput" type="password" v-model="password" />
    </div>
    <button id="registerButton" @click="register">Register</button>
    <label id="statusLabel">{{ status }}</label>
  </div>
</template>


<script>
import { doRegister } from "@/utils/apiutil.js";

export default {
  name: "RegisterComponent",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      status: "",
    };
  },
  methods: {
    async register() {
      const data = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      this.status = await doRegister(data).then((data) => data.status);

      if (this.status === "Success") {
        this.$store.dispatch("setAuthUsername", data.username);
        this.$emit("success");
      }
    },
  },
};
</script>

<style scoped>
#registerContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#registerTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
}

label {
  width: 100px;
}
</style>
