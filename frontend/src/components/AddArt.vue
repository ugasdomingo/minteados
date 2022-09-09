<script setup lang="ts">
import { ref } from 'vue';
import { useArtStore } from 'src/stores/art-store';
import { useQuasar } from 'quasar';

const title = ref('');
const q$ = useQuasar();
const link = ref('');
const description = ref('');
const category = ref('');
const image = ref('');
const accept = ref(false);

const categorys = ['Prueba', 'Gothic', 'Realism', 'Abstrac'];

const handleSubmit = async () => {
    const artStore = useArtStore();

    let formData = new FormData();
    formData.append('title', title.value);
    formData.append('link', link.value);
    formData.append('description', description.value);
    formData.append('category', category.value);
    formData.append('image', image.value[0]);

    await artStore.createArt(formData);
    q$.notify('Arte agregado a la Galería');
    artStore.getAllUserArt();
};
</script>

<template>
    <div>
        <q-form @submit.prevent="handleSubmit">
            <h4 class="text-white titles">Exibir un NFT</h4>
            <q-input
                v-model="title"
                label="Título del NFT"
                type="text"
                dark
                color="grey"
                lazy-rules
                :rules="[
                        (val: string | any[]) =>
                            (val && val.length > 0) || 'Please type your NFT name',
                    ]"
            ></q-input>

            <q-input
                v-model="link"
                label="Link de Verificación de propiedad"
                type="text"
                dark
                color="grey"
                lazy-rules
                :rules="[
                        (val: string | any[]) =>
                            (val && val.length > 0) || 'Please copy your link',
                    ]"
            ></q-input>

            <q-input
                v-model="description"
                label="Cuenta algo de tu NFT"
                type="text"
                dark
                color="grey"
            ></q-input>

            <q-select
                v-model="category"
                label="Elige una categoria"
                dark
                color="grey"
                :options="categorys"
                lazy-rules
                :rules="[
                        (val: string | any[]) =>
                            (val && val.length > 0) || 'Please choose something',
                    ]"
            ></q-select>

            <q-input v-model="image" type="file" dark color="grey"></q-input>

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
                <q-btn
                    label="Subir a la Galeria"
                    color="secondary"
                    type="submit"
                    class="q-my-lg"
                ></q-btn>
            </div>
        </q-form>
    </div>
</template>
