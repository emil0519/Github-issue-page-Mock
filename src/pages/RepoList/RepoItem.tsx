import type { RepoDataType } from '../../types'

import { useNavigate } from 'react-router-dom'
import { timeAgo } from '../../utils/horus'

function RepoItem({ repoList }: { repoList: RepoDataType[] }) {
    const navigate = useNavigate()

    const handleRepo = (repoItem: string) => {
        localStorage.setItem('repoItem', JSON.stringify(repoItem))
        navigate('/App')
    }

    const getLanguageColor = (language: string) => {
        switch (language) {
            case 'TypeScript':
                return 'bg-[#3078c3]'
            case 'JavaScript':
                return 'bg-[#f1e066]'
            case 'HTML':
                return 'bg-[#e34d2c]'
            case 'CSS':
                return 'bg-[#563d7a]'
            default:
                return 'bg-black'
        }
    }

    const getTimeDescription = (updateTime: string) =>{
        const timeDifferences =
            Date.now() - Date.parse(updateTime)
        return timeAgo(
            new Date(Date.now() - timeDifferences)
        )
    }

    if (!repoList) return <></>
    return (
        <div className="flex-1">
            {repoList.map((repoItem) => (
                <section className="mr-auto ml-auto flex flex-col" key={repoItem.node_id}>
                    <div
                        onClick={() => handleRepo(repoItem.name)}
                        className="mt-5 mb-2 flex"
                    >
                        <span className="cursor-pointer text-xl font-semibold text-blue-600 hover:underline">
                            {repoItem.name}
                        </span>
                        <div className="ml-4 rounded-2xl border-[0.5px] border-solid border-stone-400 p-1.5 text-sm text-slate-500">
                            Public
                        </div>
                    </div>
                    <div className="repos-center flex">
                        {repoItem.language && (
                            <aside className="repos-center mr-4 flex">
                                <span
                                    className={`mt-[2px] h-3 w-3 rounded-full ${getLanguageColor(
                                        repoItem.language
                                    )}`}
                                ></span>
                                <span className="ml-2 text-xs text-slate-600">
                                    {repoItem.language}
                                </span>
                            </aside>
                        )}
                        <div className="text-xs text-slate-600">
                            Updated on {getTimeDescription(repoItem.updated_at)}
                        </div>
                    </div>
                    <div className="mt-4 h-[1px] bg-stone-300"></div>
                </section>
            ))}
        </div>
    )
}

export default RepoItem
