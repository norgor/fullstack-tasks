<template>
  <calculator-component />
</template>

<script>
// @ is an alias to /src
import CalculatorComponent from "@/components/CalculatorComponent.vue";

export default {
  name: "CalculatorView",
  components: {
    CalculatorComponent,
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
