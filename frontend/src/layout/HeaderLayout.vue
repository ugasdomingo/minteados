<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo-150-blanco.png" alt="logo" />
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/galery">Galery</router-link> |
      <router-link to="/artists">Artists</router-link> |
      <router-link to="/my-account">My Account</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderLayout",
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  place-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0 24px;
}

.header img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 0;
  padding: 0;
}

nav {
  a {
    font-weight: bold;
    font-size: x-large;
    padding: 0 8px;
    color: white;

    &.router-link-exact-active {
      color: greenyellow;
    }
  }
}
</style>
