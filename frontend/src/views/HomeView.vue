<template>
  <div class="home">
    <InitialGalery />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InitialGalery from "@/components/InitialGalery.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    InitialGalery,
  },
});
</script>
