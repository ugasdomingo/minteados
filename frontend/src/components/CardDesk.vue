<script lang="ts" setup>
import { useArtStore } from 'src/stores/art-store';
import { ref } from 'vue';

const artStore = useArtStore();
const info = ref(false);

const deleteArt = async (_id: any) => {
    await artStore.deleteArt(_id);
    console.log('Art Deleted');
    artStore.getAllUserArt();
};

defineProps({
    art: Object,
});
</script>

<template>
    <q-card class="my-card" @click="info = !info">
        <img :src="art?.image" />

        <q-expansion-item>
            <q-card-section v-model="info">
                <div class="text-h6 titles text-primary">{{ art?.title }}</div>
                <div class="text-subtitle2 text-primary">
                    {{ art?.description }}
                </div>
            </q-card-section>

            <q-card-section v-model="info">
                <q-btn @click="deleteArt(art?.id)" class="bg-secondary titles">
                    Borrar
                </q-btn>
            </q-card-section>
        </q-expansion-item>
    </q-card>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
