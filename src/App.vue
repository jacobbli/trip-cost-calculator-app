<template>
  <nav-bar />
  <cost-calculator />
</template>

<script setup>
import CostCalculator from "./components/CostCalculator.vue";
import NavBar from "./components/NavBar.vue";
</script>

<style>
body {
  padding: 0 0 24px 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #7a7a7a;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
