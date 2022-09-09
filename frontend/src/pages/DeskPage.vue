<template>
    <q-page class="column col-12">
        <div class="col-12 row justify-between">
            <div class="col-6 q-ml-lg">
                <h4 class="titles">Tu arte en exibición</h4>
                <div class="flex justify-between">
                    <div v-for="art of artStore.allUserArt" :key="art.id">
                        <CardDesk :art="art" class="q-my-sm" v-on="user()" />
                    </div>
                </div>
            </div>

            <div class="col-5 q-mr-lg">
                <div>
                    <h4 class="row titles">
                        Hola,
                        <span class="q-ml-sm"> {{ name }}</span>
                    </h4>
                    <p>
                        Plan: <span class="titles">{{ plan }}</span>
                    </p>
                    <p>
                        Espacios disponibles:
                        <span class="titles">{{ disponibles }}</span>
                    </p>
                    <q-btn
                        text-color="primary"
                        color="secondary"
                        class="text-h6 titles"
                        >Comprar más espacios</q-btn
                    >
                </div>
                <q-separator color="secondary" inset spaced="48px" />
                <AddArt v-if="disponibles > 0" />
            </div>
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
const disponibles = ref();
const calcDisponibles = (plan: string) => {
    if (plan === 'visitante') {
        return 3;
    }
    if (plan === 'inactivo') {
        return 0;
    }
    if (plan === 'principiante') {
        return 3;
    }
    if (plan === 'artista') {
        return 10;
    }
    if (plan === 'coleccionista') {
        return 20;
    }
    return 0;
};
const user = async () => {
    const user = await authStore.getPrivateUser();
    name.value = user.name;
    plan.value = user.role;
    disponibles.value = calcDisponibles(user.role) - artStore.allUserArt.length;
};
user();
</script>

<style scoped></style>
