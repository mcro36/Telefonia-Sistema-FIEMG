import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';

/**
 * Envolve elementos que exigem um determinado nível de acesso (Padrão: Administrador).
 * Se o usuário não possuir acesso, o elemento será renderizado normalmente com classes CSS
 * que o 'desabilitam' visualmente e desativam eventos pointer para evitar cliques, inserindo
 * um Tooltip no container caso o usuário tente interagir.
 */
export function ProtectedRoute({ children, fallback = null, requiredRole = 'Administrador' }) {
    const { hasRole } = useAuth();
    const isAuthorized = hasRole(requiredRole);

    if (isAuthorized) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    // Se o elemento filho for único e React Válido, injetamos overrides de prop
    if (React.isValidElement(children)) {
        return (
            <div className="relative group inline-block" title="Acesso restrito ao Administrador">
                {React.cloneElement(children, {
                    onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    },
                    onSubmit: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    },
                    className: `${children.props.className || ''} opacity-50 cursor-not-allowed pointer-events-none!`,
                    disabled: true,
                    tabIndex: -1,
                    "aria-disabled": "true",
                })}
            </div>
        );
    }

    return <>{children}</>;
}
