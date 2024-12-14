import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import ReferTable from "./ReferTable/ReferTable";
import { YourRequestsState, yourRequestsActions } from "../../store/yourRequests-slice";

const PeopleYouReferred = () => {
    // const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const data: YourRequestsState[] = useSelector((state: RootState) => state.yourRequests);
    const userId: string = useSelector((state: RootState) => state.user.userId);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [arePostsNull, setArePostsNull] = useState<boolean>(false);
    // const [postsCount, setPostsCount] = useState<number>(0);
    const [pageNumber, ] = useState<number>(1);
    // const [showPagination, setShowPagination] = useState<boolean>(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await axios.get(`https://referall-backend.onrender.com/posts/getPostsReferredByUser/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                // console.log(response.data);
                dispatch(yourRequestsActions.setYourRequestsObjects(response.data));
                setArePostsNull(response.data.length === 0);
            } catch (error) {
                console.error("error");
                setArePostsNull(true);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [pageNumber]);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            {isLoading ? (
                <div className="text-indigo-700 text-xl md:text-2xl font-semibold animate-fade-in-out">
                    Loading data...
                </div>
            ) : (
                <div className="w-full -mt-20 mb-16">
                    <div className="w-full text-center text-3xl md:text-5xl h-16 font-semibold mb-4 md:mb-8">
                        REQUESTS REFERRED{" "}
                        <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">
                            BY YOU
                        </span>
                    </div>
                    <div className="w-full flex justify-center">
                        {/* <Filters setArePostsNull={setArePostsNull} setShowPagination={setShowPagination} setPageNumber={setPageNumber}/> */}
                    </div>
                    {arePostsNull ? (
                        <div className="mt-4 mb-4 text-2xl font-semibold text-indigo-700 w-full flex justify-center">
                            No posts found!!
                        </div>
                    ) : (
                        <div className="w-full flex justify-center">
                            <ReferTable data={data} />
                        </div>
                    )}
                    {/* <button className="ml-36 px-4 py-2 shadow-indigo-600 text-white rounded-lg bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer" onClick={clickHandler}>Refresh Posts</button> */}
                    {/* {!arePostsNull && showPagination && <div className="w-full flex justify-center"><Pagination postsCount={postsCount} pageNumber={pageNumber} setPageNumber={setPageNumber}/></div>} */}
                </div>
            )}
        </div>
    );
};

export default PeopleYouReferred;
