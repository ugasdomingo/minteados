<template>
  <HeaderLayout />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLayout from "@/layout/HeaderLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderLayout,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Mouse+Memoirs&family=Source+Sans+Pro:wght@300&display=swap");
#app {
  font-family: Mouse Memoirs, Source Sans Pro;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #6302b7;
  height: 100vh;
  width: 100%;
}

body {
  margin: 0;
}
</style>
