<template>
  <div>
    <login-component @failure="loginFailed = true" @success="loggedIn" />

    <p v-if="loginFailed">
      Unable to log in! Would you like to
      <router-link :to="{ name: 'Register' }">Register</router-link>
      ?
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      loginFailed: false,
    };
  },
  methods: {
    loggedIn() {
      this.$router.push({ name: "Home" });
    },
  },
  components: {
    LoginComponent,
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
