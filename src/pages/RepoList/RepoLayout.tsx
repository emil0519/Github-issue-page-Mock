import repo from '../../img/repo.svg'

export type RepoProps = {
  repoList: any
  user?: any
}

function RepoLayout({ repoList, user }: RepoProps) {

    if (repoList === undefined || user === undefined) {
        return <></>
    }
    return (
        <div className='flex-2'>
            <div className="mt-[24px] flex items-center med:h-[fit-content] med:flex-col">
                <img
                    src={user.avatar_url}
                    alt=""
                    className="h-[65px] w-[65px] rounded-full med:h-[296px] med:w-[296px]"
                ></img>
                <span className="mt-[12px] mr-[22px] text-[20px]">
                    {user.user_name}
                </span>
            </div>
            <div className="mt-[20px] flex h-[max-content] items-center rounded-md border-[1px] border-solid border-[#cad1d9] p-[5px] med:hidden">
                <span className="text-[14px]">
                    Please choose a repository below
                </span>
            </div>
            <div className="mt-[24px] mr-auto ml-auto h-[1px] w-[95%] bg-[#cad1d9] med:hidden"></div>
            <div className="mt-[24px] flex h-[24px] w-[160px] cursor-pointer hover:rounded-md hover:bg-[#eef0f3] med:hidden">
                <img
                    className="mr-[8px] h-[16px] w-[16px]"
                    alt=""
                    src={repo}
                ></img>
                <span className="mr-[8px] text-[14px] font-semibold">
                    Repositories
                </span>
                <div className="flex h-[20px] w-[27px] items-center justify-center rounded-full bg-[#edeff1]">
                    <span className="text-[12px]">{repoList.length}</span>
                </div>
            </div>
            <div className="mt-[12px] mr-auto ml-auto h-[1px] w-[95%] bg-[#cad1d9] med:hidden"></div>
            <div className="m-0 flex flex-col med:ml-[40px] med:w-[60%]">
                <div className="mt-[24px] hidden h-[24px] w-[160px] cursor-pointer hover:rounded-md hover:bg-[#eef0f3] med:flex">
                    <img
                        className="mr-[8px] h-[16px] w-[16px]"
                        alt=""
                        src={repo}
                    ></img>
                    <span className="mr-[8px] text-[14px] font-semibold">
                        Repositories
                    </span>
                    <div className="flex h-[20px] w-[27px] items-center justify-center rounded-full bg-[#edeff1]">
                        <span className="text-[12px]">{repoList.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RepoLayout
