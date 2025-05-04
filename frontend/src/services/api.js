import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL

// buat instance axios dengan baseurl
const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(
    (config) => {
        // 1. ambil token dari local storage
        const token = localStorage.getItem('token');

        // 2. jika token ada, tambahkan ke header authorization
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// response interceptor: jalankan setelah response diterima
api.interceptors.response.use(
    // jika response success, return langsung
    (response) => response,

    // kalo error (4xx, 5xx)
    async(error)=>{
        //cek apakah errornya karena expired (401)
        if(error.response?.status === 401){
            // simpan request asli untuk diretry nanti
            const originalRequest = error.config;

            // cek apakah req belom pernah diretry untuk hindari infinite loop
            if(!originalRequest._retry){
                originalRequest._retry = true;

                try {
                    // ambil refreshtoken dan coba dapet token baru
                    const refreshToken = localStorage.getItem('refreshToken');
                    const response = await axios.post(`${BASE_URL}/refresh`, { refreshToken });
                    const newToken = response.data.token;

                    //update token di local storage
                    localStorage.setItem('token', newToken);

                    // update token di request asli dan retry
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return api(originalRequest);

                } catch (refreshErr) {
                    //refresh token invalid/expired, login ulang
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshErr);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL
// });

// // Interceptor: otomatis pasang Authorization header jika ada token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;