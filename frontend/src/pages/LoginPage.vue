<script setup>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth-store';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const handleSubmit = async () => {
    try {
        console.log('pasó las validaciones');
        await authStore.access(email.value, password.value);
        router.push('/escritorio');
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
    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-5 justify-between">
            <h3 class="text-white titles">Nos alegra verte</h3>
            <q-form @submit.prevent="handleSubmit">
                <q-input
                    v-model="email"
                    color="white"
                    dark
                    label="Ingrese email"
                    type="text"
                    :rules="[
                        (val) =>
                            (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
                            'Formato email incorrecto',
                    ]"
                ></q-input>

                <q-input
                    v-model="password"
                    label="Ingrese contraseña"
                    color="white"
                    dark
                    type="password"
                    :rules="[
                        (val) =>
                            (val && val.length > 5) ||
                            'Contraseña mínimo 6 carácteres',
                    ]"
                ></q-input>

                <div>
                    <q-btn
                        label="Iniciar Sesión"
                        class="titles q-mb-xl q-mt-sm text-h6"
                        color="secondary"
                        type="submit"
                    ></q-btn>
                </div>
            </q-form>
            <div class="q-mt-xl flex">
                <p class="q-my-sm q-mr-sm text-h6">¿Primera vez?</p>
                <q-btn class="titles text-h6" to="signup" color="secondary"
                    >Crear una cuenta</q-btn
                >
            </div>
        </div>
    </q-page>
</template>
