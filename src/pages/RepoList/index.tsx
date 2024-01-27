import type { UserInfoType } from '../../types'

import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

import { useGetRepoQuery } from '../../state/issueRTK'
import RepoLayout from './RepoLayout'
import RepoItem from './RepoItem'

const RepoList = () => {
    const [skip, setSkip] = useState<boolean>(true)
    const navigate = useNavigate()
    const userInfo: UserInfoType = useMemo(() => {
        const localUserInfo = localStorage.getItem('supabase.auth.token')
        if (localUserInfo) return JSON.parse(localUserInfo)
        return null
    }, [])
    const { data: repoList, error } = useGetRepoQuery(
        {
            baseType: 'users',
            name: `/${
                skip
                    ? ''
                    : userInfo?.currentSession.user.user_metadata.user_name ||
                      ''
            }`,
            query: '/repos',
            token: `${
                skip ? '' : userInfo?.currentSession.provider_token || ''
            }`,
        },
        { skip: skip }
    )

    useEffect(() => {
        if (userInfo) {
            setSkip(false)
        } else {
            navigate('/')
        }
    }, [userInfo])

    useEffect(() => {
        if (error?.status === 401) navigate('/')
    }, [error])

    if (!userInfo) return <></>

    return (
        <section className="mr-auto ml-auto flex w-[95%] max-w-[1192px] flex-col gap-6 med:flex-row">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Your repositories</title>
                <link rel="canonical" href="/App" />
                <meta name="keywords" content="github, github repositories" />
                <meta name="author" content="Emil Lau" />
            </Helmet>
            <RepoLayout
                repoList={repoList}
                user={userInfo?.currentSession.user.user_metadata || null}
            />
            <RepoItem repoList={repoList} />
        </section>
    )
}

export default RepoList
