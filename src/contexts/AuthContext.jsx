import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Para simplificar a demonstração inicial, simularemos um login pré-existente
    // Posteriormente isso pode ser integrado com Supabase Auth/Profiles
    const [user, setUser] = useState({
        id: '1',
        name: 'Administrador do Sistema',
        email: 'fiemg_admin@fiemg.com.br',
        role: 'Administrador', // 'Administrador' ou 'Viewer'
        avatarInitials: 'R',
    });

    const hasRole = (roleQuery) => {
        if (!user) return false;
        return user.role === roleQuery;
    };

    const login = (userData) => { /* Lógica futura */ setUser(userData); };
    const logout = () => { /* Lógica futura */ setUser(null); };

    return (
        <AuthContext.Provider value={{ user, setUser, hasRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
