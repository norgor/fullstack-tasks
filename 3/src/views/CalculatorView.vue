<template>
  <calculator />
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";

export default {
  name: "HomeView",
  components: {
    Calculator,
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
