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
                    text-color="primary"
                    to="escritorio"
                    class="titles text-h6"
                    v-if="!authStores.token"
                >
                    Mi Escritorio
                </q-btn>
                <q-btn
                    color="secondary"
                    text-color="primary"
                    class="titles text-h6"
                    @click="logout"
                    v-if="authStores.token"
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

        <q-drawer v-model="rightDrawerOpen" side="right" class="bg-primary">
            <q-lis>
                <q-item-label class="text-white" header>
                    ¿Que quieres hacer hoy?
                </q-item-label>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
                <q-img
                    src="../assets/nft-collectibles-hero.png"
                    style="max-width: 200px"
                    class="q-mt-xl"
                />
                <q-btn
                    class="q-mt-lg q-ml-lg titles text-h6"
                    color="secondary"
                    text-color="primary"
                    to="escritorio"
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
                    color="positive"
                    target="Blank"
                    href="https://wa.me/584245298662?text=Hola%2C%20minteados"
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
import { useAuthStore } from '../stores/auth-store';
import EssentialLink from '../components/EssentialLink.vue';

const authStores = useAuthStore();
const router = useRouter();
const rightDrawerOpen = ref(false);
const essentialLinks = [
    {
        title: 'Sobre nosotros - (pronto)',
        caption: 'Conocer nuestro lado oscuro',
        icon: 'school',
        link: 'sobre-nosotros',
    },
    {
        title: 'Mi escritorio',
        caption: 'Gestiona tus NFT',
        icon: 'chat',
        link: 'escritorio',
    },
    {
        title: 'Ver la galeria',
        caption: 'Ver todos los NFT',
        icon: 'record_voice_over',
        link: 'gallery',
    },
];
function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value;
}
const logout = async () => {
    await authStores.logout();
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
