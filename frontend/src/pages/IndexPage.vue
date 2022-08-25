<template>
    <q-page>
        <div class="servicios-title">
            <h3 class="text-white">Disfruta el Arte NFT</h3>
            <p class="text-secondary">Colecciones para admirar y coleccionar</p>
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

<style lang="sass" scoped></style>
