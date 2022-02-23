<template>
  <register-component @success="loggedIn" />
</template>

<script>
// @ is an alias to /src
import RegisterComponent from "@/components/RegisterComponent.vue";

export default {
  name: "HomeView",
  methods: {
    loggedIn() {
      this.$router.push({ name: "Home" });
    },
  },
  components: {
    RegisterComponent,
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
