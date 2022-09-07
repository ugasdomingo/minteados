<template>
    <q-page>
        <div class="text-center q-my-xl">
            <h1 class="text-white titles text-h1 q-my-xs">
                Conviértete en parte de la Historia
            </h1>
            <p class="text-info text-h5">Muestra al mundo tu colección NFT</p>
        </div>
        <div class="row justify-center">
            <template v-for="art of artStore.allArt" :key="art.id">
                <CardGallery :art="art" class="q-ma-sm" />
            </template>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useArtStore } from 'src/stores/art-store';

import CardGallery from 'src/components/CardGallery.vue';

const artStore = useArtStore();
artStore.getAllArt();
</script>

<style scoped></style>
