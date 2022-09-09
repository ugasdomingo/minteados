<template>
    <div
        class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
    >
        <div>
            <div style="font-size: 30vh">404</div>

            <div class="text-h2 titles" style="opacity: 0.4">
                Oops. Nothing here...
            </div>

            <q-btn
                class="q-mt-xl titles"
                color="white"
                text-color="blue"
                unelevated
                to="/"
                label="Ir al inicio"
                no-caps
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ErrorNotFound',
});
</script>
