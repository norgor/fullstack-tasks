<template>
  <div>
    <h1>Welcome, {{ username }}!</h1>
    <p>You can now access all of the services!</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
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
