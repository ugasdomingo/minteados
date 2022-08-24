<template>
    <q-page class="column col-12">
        <div class="row justify-between">
            <div class="col-md-5 q-ml-lg">
                <h4>Tu arte en exibición</h4>
                <div
                    v-for="art of artStore.allUserArt"
                    :key="art.id"
                    class="container"
                >
                    <CardDesk :art="art" class="q-my-sm" />
                </div>
            </div>

            <div class="col-md-5 q-mr-lg">
                <AddArt />
            </div>
        </div>
        <div class="q-ml-lg">
            <h4 class="row">
                Hola,
                <span class="q-ml-sm"> {{ name }}</span>
            </h4>
            <p>
                Plan: <span>{{ plan }}</span>
            </p>
            <p>
                Espacios disponibles: {{ disponibles }} espacios
                <q-btn class="bg-secondary q-ml-sm">Comprar más espacios</q-btn>
            </p>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { useArtStore } from 'src/stores/art-store';
import { useAuthStore } from 'src/stores/auth-store';

//Components
import AddArt from 'src/components/AddArt.vue';
import CardDesk from 'src/components/CardDesk.vue';
import { ref } from 'vue';

//Queries
const artStore = useArtStore();
const authStore = useAuthStore();
artStore.getAllUserArt();

//functions
const name = ref('');
const plan = ref('');
const disponibles = 3;
const user = async () => {
    const user = await authStore.getPrivateUser();
    name.value = user.name;
    plan.value = user.role;
};
user();
</script>

<style scoped>
.container {
    display: flex;
}
</style>
