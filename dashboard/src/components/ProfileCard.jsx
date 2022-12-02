

 function ProfileCard() {
    return (
        <div>
            <div className="flex flex-wrap justify-center">
                <div className="w-48 px-4 -mt-24">
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlNze0rQq_kQfttZL4-2txpGs8kkAk8IWFFEtrJF1oTa9BDQ3lB4OHustr1iI25lRu6E&usqp=CAU"} className="rounded-full" />
                </div>
                <div className="w-full flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            22
                        </span>
                        <span className="text-sm text-gray-700">Friends</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            89
                        </span>
                        <span className="text-sm text-gray-700">Comments</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            10
                        </span>
                        <span className="text-sm text-gray-700">Photos</span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h6 color="gray">John Smith</h6>
                <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                    {/* <Icon name="place" size="xl" /> */}
                    Los Angeles, California
                </div>
                <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                    {/* <Icon name="work" size="xl" /> */}
                    Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                    {/* <Icon name="account_balance" size="xl" /> */}
                    University of Computer Science
                </div>
            </div>
            <div>
                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    <p color="blueGray">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                    </p>
                </div>
            </div>
            <div>
                <div className="w-full flex justify-center -mt-8">
                    <a
                        href="#pablo"
                        className="mt-5"
                        onClick={(e) => e.preventDefault()}
                    >
                        <button color="purple">
                            Show more
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default ProfileCard