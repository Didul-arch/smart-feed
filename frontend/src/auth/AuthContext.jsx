import { createContext, useReducer } from 'react';
import axios from 'axios';

// buat context untuk share state auth ke seluruh aplikasi
export const AuthContext = createContext();

// state awal autentikasi
const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null
};

// reducer: cara react mengelola state yang kompleks
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST': // kalo user lagi proses login
            return { ...state, isLoading:true, error: null };   
        case 'LOGIN_SUCCESS': // kalo user berhasil login
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
                error: null
            };
        case 'LOGIN_FAILURE': // gagal login
            return { ...state, isLoading: false, error: action.payload };
        case 'LOGOUT': // ya logout
            return { ...initialState, token: null, refreshToken: null, isAuthenticated:false };
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    // useReducer: hook untuk state management kompleks
    // state: data state saat ini
    // dispatch: fungsi untuk update state
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const BASE_URL = import.meta.env.VITE_BASE_URL

    // fungsi login: mengirim email dan password ke api login
    const login = async (email, password) => {
        // 1. update state menggunakan dispatch untuk nanti ditangkep
        // sama si authreducer buat ngeubah statenya nanti
        dispatch({ type: 'LOGIN_REQUEST' });

        try {
            // 2. kirim request ke endpoint login
            const response = await axios.post(`${BASE_URL}/login`, { email, password });

            // 3. Ambil token dari response
            const { token, refreshToken } = response.data;

            // 4. simpen token di local storage agar gak ilang kalo refresh webnya
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            // 5. update state auth menjadi LOGIN_SUCCESS biar nanti
            // masuk ke reducer terus state nya berubah.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { token, refreshToken, user: { email }}
            });

            return true;
        } catch (err) {
            // 6. kalo error/gagal, dispatchnya pake yang tipe failure
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.response?.data?.message || 'Login Gagal'
            }) 
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}