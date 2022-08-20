<template>
    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-8">
            <h3 class="text-white text-center">Disfruta del arte NFT</h3>
            <pre>
              {{ artStore.allArt }}
            </pre>
        </div>
    </q-page>
</template>

<script lang="ts">
import { useArtStore } from 'src/stores/art-store';

export default {
    setup() {
        const artStore = useArtStore();
        artStore.getAllArt();

        return {
            artStore,
        };
    },
};
</script>
