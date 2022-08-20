//Import tools
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useUserStore } from './user-store';

export const useArtStore = defineStore('art', () => {
    const userStore = useUserStore();
    const art = ref('');
    const allArt = ref('');

    const getAllArt = async () => {
        try {
            console.log('Peticion get all');
            const res = await api({
                url: '/galery',
                method: 'GET',
            });
            allArt.value = res.data.arte.map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    uid: item.uid,
                    show: item.show,
                    link: item.link,
                    image: item.image?.secure_url,
                };
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const createArt = async (formData: any) => {
        try {
            const res = await api({
                url: '/galery',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + userStore.token,
                },
                data: formData,
            });

            art.value = res.data.arte;
            console.log(art.value);
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    return { createArt, allArt, getAllArt };
});
