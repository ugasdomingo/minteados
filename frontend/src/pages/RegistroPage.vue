<script setup>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth-store';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const repassword = ref('');
const handleSubmit = async () => {
    try {
        console.log('pasó las validaciones');
        await authStore.register(name.value, email.value, password.value);
        router.push('/');
        email.value = '';
        password.value = '';
    } catch (error) {
        console.log('error', error);
        if (error.error) {
            alertDialogBackend(error.error);
        } else if (error.errors[0].msg) {
            alertDialogBackend(error.errors[0].msg);
        } else {
            alertDialogBackend();
        }
    }
};
const alertDialogBackend = (message = 'Error en el servidor') => {
    $q.dialog({
        title: 'Error',
        message,
    });
};
</script>

<template>
    <q-page class="q-mx-sm">
        <div class="flex justify-center items-center">
            <div>
                <h3 class="titles">Bienvenido(a) a Bordo</h3>
                <q-form @submit.prevent="handleSubmit">
                    <q-input
                        v-model="name"
                        dark
                        label="Ingresa tu Nombre Completo"
                        type="text"
                    ></q-input>

                    <q-input
                        v-model="email"
                        dark
                        label="Ingrese email"
                        type="text"
                        :rules="[
                            (val) =>
                                (val &&
                                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                                'Formato email incorrecto',
                        ]"
                    ></q-input>

                    <q-input
                        v-model="password"
                        dark
                        label="Ingrese contraseña"
                        type="password"
                        :rules="[
                            (val) =>
                                (val && val.length > 5) ||
                                'Contraseña mínimo 6 carácteres',
                        ]"
                    ></q-input>

                    <q-input
                        v-model="repassword"
                        dark
                        label="Repita contraseña"
                        type="password"
                        :rules="[
                            (val) =>
                                (val && val === password) ||
                                'No coinciden las contraseñas',
                        ]"
                    ></q-input>

                    <div>
                        <q-btn
                            label="Registrarme"
                            class="titles text-h6"
                            color="secondary"
                            type="submit"
                        ></q-btn>
                    </div>
                </q-form>
                <div class="q-mt-xl flex">
                    <p class="q-my-sm q-mr-sm text-h6 text-white">
                        ¿Ya tienes una cuenta?
                    </p>
                    <q-btn class="titles text-h6" to="login" color="secondary"
                        >Iniciar Sesión</q-btn
                    >
                </div>
            </div>
            <q-img
                src="img/nft-mascota.png"
                class="q-ml-xl"
                style="max-width: 250px; height: 400px"
                :fit="cover"
            />
        </div>
    </q-page>
</template>

<style scoped></style>
