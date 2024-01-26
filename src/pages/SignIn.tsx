import type { Session, User } from '@supabase/supabase-js'


import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import github from '../img/github.svg'
import { superbase } from '../utils/client'

type AuthUserType = User | null;
type SessionType = Session | null

const SignIn = () => {
    useEffect(() => {
        checkUser()
        window.addEventListener("hashchange", function () {
          checkUser();
        });
    }, [])
    const navigate = useNavigate()
    const [user, setUser] = useState<AuthUserType>(null)
    const [session, setSession] = useState<SessionType>(null)

    async function checkUser() {
        const user: AuthUserType = superbase.auth.user()
        const session: SessionType = superbase.auth.session()
        setUser(user)
        setSession(session)
    }

    async function signInWithGitHub() {
        await superbase.auth.signIn(
            {
                provider: 'github',
            },
            {
                scopes: 'repo gist notifications',
            }
        )
    }
    /**
     * Block logged in user from browsing this page
     */
    useEffect(() => {
        if (session && session.provider_token) {
            navigate('/Repo')
        }
    }, [session])

    return (
        <section className="flex h-screen w-screen flex-col items-center justify-center bg-white">
            <img
                src={github}
                className="mb-6 h-12 w-12 cursor-pointer"
                alt="Github logo"
            ></img>
            <span className="text-6 font-bold text-black">
                Sign in to GitHub
            </span>
            <div className="mt-4 flex h-56 w-80 flex-col items-center rounded-md border-2 border-solid border-stone-200 bg-white">
                <span className="mt-4 w-[85%] text-center text-4 font-semibold">
                    Welcome to Github Issue Remote Control
                </span>
                <span className="mt-8 w-[85%] text-center text-gray-400">
                    Sign in to choose your repository.
                </span>
                <div
                    onClick={signInWithGitHub}
                    className="mt-7 flex h-8 w-60 cursor-pointer items-center justify-center rounded-md bg-green-600"
                >
                    <span className="text-white">Sign in</span>
                </div>
            </div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign in</title>
                <link rel="canonical" href="/App" />
                <meta name="keywords" content="github" />
                <meta name="author" content="Emil Lau" />
            </Helmet>
        </section>
    )
}

export default SignIn;
