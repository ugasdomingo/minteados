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
    <q-card class="card cursor-pointer" @click="info = !info">
        <img :src="art?.image" />

        <q-expansion-item>
            <q-card-section v-model="info">
                <div class="text-h6 text-primary">{{ art?.title }}</div>
                <div class="text-subtitle2 text-primary">
                    {{ art?.description }}
                </div>
            </q-card-section>

            <q-card-section v-model="info">
                <q-btn @click="deleteArt(art?.id)" class="bg-secondary">
                    Borrar
                </q-btn>
            </q-card-section>
        </q-expansion-item>
    </q-card>
</template>

<style scoped>
.card {
    width: 100%;
    max-width: 250px;
}
.card img {
    width: 250px;
    height: 250px;
    object-fit: contain;
}
</style>
