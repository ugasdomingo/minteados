<template>
    <q-item clickable :to="link">
        <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" class="text-secondary" />
        </q-item-section>

        <q-item-section>
            <q-item-label class="titles text-secondary text-h6">{{
                title
            }}</q-item-label>
            <q-item-label class="text-white">{{ caption }}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'EssentialLink',
    props: {
        title: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
        icon: {
            type: String,
            default: '',
        },
    },
});
</script>
