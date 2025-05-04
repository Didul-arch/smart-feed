import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
    // ambil state dan fungsi dari AuthContext
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth harus digunakan dalam AuthProvider')
    }

    return context;
}