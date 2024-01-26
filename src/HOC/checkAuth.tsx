import React, { FC, useEffect, useRef } from 'react'

/**
 * Check if superbase auth is present in every page
 */
const checkAuth = (WrappedComponent: FC) => {
    return (props: React.ComponentProps<typeof WrappedComponent>) => {
        const isLoggedIn = useRef<boolean>(false);
        useEffect(() => {
            const token: string | null = localStorage.getItem(
                'supabase.auth.token'
            )
            isLoggedIn.current = !!token && token.length > 0;
        }, [])
        return isLoggedIn ? <WrappedComponent {...props} /> : null;
    }
}

export default checkAuth;
