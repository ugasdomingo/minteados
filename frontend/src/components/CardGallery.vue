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
    <q-card class="my-card cursor-pointer">
        <img :src="art?.image" />

        <q-popup-proxy>
            <q-card-section>
                <div class="text-h6 titles text-primary">{{ art?.title }}</div>
                <div class="text-subtitle2 text-primary">
                    {{ art?.description }}
                </div>
            </q-card-section>

            <q-card-section>
                <q-btn
                    @click="findUser(art?.uid)"
                    class="bg-secondary titles"
                    label="Contactar Artista"
                >
                    <q-popup-proxy class="text-primary">
                        <p class="q-py-none q-ma-sm">
                            Nombre:
                            <span class="titles">{{ name }}</span>
                        </p>
                        <p class="q-py-none q-ma-sm">
                            Correo: <span class="titles">{{ email }}</span>
                        </p>
                    </q-popup-proxy>
                </q-btn>
            </q-card-section>
        </q-popup-proxy>
    </q-card>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
