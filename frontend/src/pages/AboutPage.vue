<template>
    <p>{{ artStore.allUserArt }}</p>
</template>

<script lang="ts" setup>
import { useArtStore } from 'src/stores/art-store';

const artStore = useArtStore();
artStore.getAllUserArt();
</script>
