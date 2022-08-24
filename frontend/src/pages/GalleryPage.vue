<template>
    <q-page class="column">
        <h3 class="text-white text-center">Disfruta del arte NFT</h3>
        <div class="row justify-center">
            <template v-for="art of artStore.allArt" :key="art.id">
                <CardGallery :art="art" class="q-ma-sm" />
            </template>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { useArtStore } from 'src/stores/art-store';

//Component
import CardGallery from 'src/components/CardGallery.vue';

const artStore = useArtStore();
artStore.getAllArt();
</script>

<style scoped></style>
