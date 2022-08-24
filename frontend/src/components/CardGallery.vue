<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';

const authStore = useAuthStore();
const name = ref('');
const email = ref('');

const findUser = async (uid: any) => {
    const res = await authStore.getUser(uid);
    name.value = res.name;
    email.value = res.email;
};

defineProps({
    art: Object,
});
</script>

<template>
    <q-card class="card cursor-pointer">
        <img :src="art?.image" />

        <q-popup-proxy>
            <q-card-section>
                <div class="text-h6 text-primary">{{ art?.title }}</div>
                <div class="text-subtitle2 text-primary">
                    {{ art?.description }}
                </div>
            </q-card-section>

            <q-card-section>
                <q-btn
                    @click="findUser(art?.uid)"
                    class="bg-secondary"
                    label="Contactar Artista"
                >
                    <q-popup-proxy class="text-primary">
                        <p>
                            Nombre: <span>{{ name }}</span>
                        </p>
                        <p>
                            Correo: <span>{{ email }}</span>
                        </p>
                    </q-popup-proxy>
                </q-btn>
            </q-card-section>
        </q-popup-proxy>
    </q-card>
</template>

<style scoped>
.card {
    max-width: 200px;
}
.card img {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>
