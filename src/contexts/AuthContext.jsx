import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        // Obter sessão inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            parseAndSetUser(session);
            setLoadingAuth(false);
        });

        // Ouvir mudanças na autenticação
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            parseAndSetUser(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const parseAndSetUser = (session) => {
        if (!session?.user) {
            setUser(null);
            return;
        }

        const metadata = session.user.user_metadata || {};
        setUser({
            id: session.user.id,
            email: session.user.email,
            name: metadata.name || session.user.email.split('@')[0],
            role: metadata.role || 'Viewer', // Default
            avatarInitials: metadata.avatarInitials || session.user.email[0].toUpperCase(),
            is_active: metadata.is_active ?? true
        });
    };

    const hasRole = (roleQuery) => {
        if (!user) return false;
        return user.role === roleQuery;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    // Exporta session real
    return (
        <AuthContext.Provider value={{ user, loadingAuth, hasRole, logout }}>
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

