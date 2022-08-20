<template>
    <q-layout view="hhr lpR ffr">
        <q-header elevated class="gradiant text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <router-link
                        to="/"
                        class="text-bold"
                        style="text-decoration: none"
                    >
                        <img
                            src="img/logo-150-blanco.png"
                            class="logo-header"
                        />
                    </router-link>
                </q-toolbar-title>

                <q-btn
                    color="secondary"
                    to="subir-nft"
                    v-if="!userStores.token"
                >
                    Subir un NFT
                </q-btn>
                <q-btn
                    color="secondary"
                    @click="logout"
                    v-if="userStores.token"
                >
                    Cerrar Sesión
                </q-btn>

                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="toggleRightDrawer"
                    color="white"
                    class="q-ml-lg"
                />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="rightDrawerOpen" side="right" bordered dark>
            <q-lis>
                <q-item-label header> ¿Que quieres hacer hoy? </q-item-label>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
                <q-btn
                    class="q-mt-lg q-ml-lg"
                    color="secondary"
                    target="blank"
                    href="subir-nft"
                    >Exibir un NFT
                </q-btn>
            </q-lis>
        </q-drawer>

        <q-page-container class="gradiant">
            <router-view />
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn
                    fab
                    icon="whatsapp"
                    color="accent"
                    target="Blank"
                    href="https://wa.me/584245933845?text=Hola%2C%20me%20gustar%C3%ADa%20una%20consulta%20online"
                />
            </q-page-sticky>
        </q-page-container>

        <q-footer elevated class="bg-primary text-accent">
            <q-toolbar>
                <q-toolbar-title>
                    <!-- <div>Title</div> -->
                </q-toolbar-title>

                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="toggleRightDrawer"
                    color="white"
                />
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<!-- Scripts Sectión -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user-store';
import EssentialLink from '../components/EssentialLink.vue';
const userStores = useUserStore();
const router = useRouter();
const rightDrawerOpen = ref(false);
const essentialLinks = [
    {
        title: 'Sobre mi - (pronto)',
        caption: '¿Por qué deberías seguirme?',
        icon: 'school',
        link: '#',
    },
    {
        title: 'Exponer NFT',
        caption: 'Tu NFT en nuestras galerías de arte',
        icon: 'code',
        link: 'subir-nft',
    },
    {
        title: 'Mi escritorio',
        caption: 'Herramienta terapeutica',
        icon: 'chat',
        link: 'escritorio',
    },
    {
        title: 'Ver la galeria',
        caption: 'Disfruta el arte NFT',
        icon: 'record_voice_over',
        link: 'gallery',
    },
];
function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value;
}
const logout = async () => {
    await userStores.logout();
    router.push('/');
};
</script>

<!-- Styles Sectión -->
<style lang="scss" scoped>
.gradiant {
    background: linear-gradient(to top, #8928f0, #6302b7);
}
.logo-header {
    width: 150px;
    padding: 12px 0px;
}
</style>
