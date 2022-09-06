//Import tools
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useAuthStore } from './auth-store';

export const useArtStore = defineStore('art', () => {
    const authStore = useAuthStore();
    const art = ref('');
    const allArt = ref('');
    const allUserArt = ref('');

    const getAllArt = async () => {
        try {
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

    const getAllUserArt = async () => {
        try {
            const res = await api({
                url: '/galery/user',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + authStore.token,
                },
            });
            allUserArt.value = res.data.arte.map((item: any) => {
                return {
                    id: item._id,
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
                    Authorization: 'Bearer ' + authStore.token,
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            });

            art.value = res.data.arte;
            console.log(art.value);
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const deleteArt = async (id: any) => {
        try {
            const res = await api({
                url: '/galery/' + id,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + authStore.token,
                },
            });
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    return {
        createArt,
        allArt,
        allUserArt,
        getAllArt,
        getAllUserArt,
        deleteArt,
    };
});
