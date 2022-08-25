//Import tools
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('user', () => {
    const token = ref(null);
    const expiresIn = ref(0);

    const access = async (email: string, password: string) => {
        try {
            const res = await api.post('/login', {
                email,
                password,
            });
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            sessionStorage.setItem('user', '🔥🔥');
            setTime();
        } catch (error: any) {
            if (error.response) {
                // console.log(error.response.data);
                throw error.response.data;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await api.post('/register', {
                name: name,
                email: email,
                password: password,
            });
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            sessionStorage.setItem('user', '🔥🔥');
            setTime();
        } catch (error: any) {
            if (error.response) {
                // console.log(error.response.data);
                throw error.response.data;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    const logout = async () => {
        try {
            await api.get('/logout');
        } catch (error: any) {
            console.log(error);
        } finally {
            resetStore();
            sessionStorage.removeItem('user');
        }
    };

    const setTime = () => {
        setTimeout(() => {
            console.log('se refrescó');
            refreshToken();
        }, expiresIn.value * 1000 - 6000);
    };

    const refreshToken = async () => {
        console.log('RefreshToken');
        try {
            const res = await api.get('/refresh');
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            sessionStorage.setItem('user', 'usuario cualquiera');
            setTime();
        } catch (error: any) {
            console.log(error);
            sessionStorage.removeItem('user');
        }
    };

    const resetStore = () => {
        token.value = null;
        expiresIn.value = 0;
    };

    const getUser = async (id: any) => {
        try {
            const res = await api({
                url: '/user/' + id,
                method: 'GET',
            });
            return res.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    const getPrivateUser = async () => {
        try {
            const res = await api({
                url: '/user',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token.value,
                },
            });
            return res.data;
        } catch (error: any) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    return {
        token,
        expiresIn,
        access,
        refreshToken,
        logout,
        register,
        getUser,
        getPrivateUser,
    };
});
