import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import ReferTable from "./ReferTable/ReferTable";
import { YourRequestsState, yourRequestsActions } from "../../store/yourRequests-slice";

const ReferralRequestPosts = () => {
    // const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const data: YourRequestsState[] = useSelector((state: RootState) => state.yourRequests);
    const userId: string = useSelector((state: RootState)=> state.user.userId);

    // const [fetching, setFetching] = useState(0);
    const [arePostsNull,] = useState<boolean>(false);
    // const [postsCount, setPostsCount] = useState<number>(0);
    const [pageNumber, ] = useState<number>(1);
    // const [showPagination, setShowPagination] = useState<boolean>(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://referall-backend.onrender.com/posts/getPostsByUser/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                // console.log(response.data);
                dispatch(yourRequestsActions.setYourRequestsObjects(response.data));
            } catch (error) {
                console.error("error");
            }
        };

        fetchData();
    }, [pageNumber]);

    // function clickHandler(){
    //     setFetching((fetching+1) / 2)
    //   }

    return (
        <div className="w-screen">
            <div className="w-full mt-28 md:mt-28 lg:mt-40 mb-16">
                <div className="w-full text-center text-3xl md:text-5xl h-16 font-semibold mb-4 md:mb-8">YOUR <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">REFERRAL REQUESTS</span></div>
                <div className="w-full flex justify-center">
                    {/* <Filters setArePostsNull={setArePostsNull} setShowPagination={setShowPagination} setPageNumber={setPageNumber}/> */}
                </div>
                {arePostsNull && <div className="mt-4 mb-4 text-2xl font-seimibold text-indigo-700 w-full flex justify-center">No posts found!!</div>}
                {!arePostsNull && <div className="w-full flex justify-center">
                    <ReferTable data={data}/>
                </div>}
                {/* <button className="ml-36 px-4 py-2 shadow-indigo-600 text-white rounded-lg bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer" onClick={clickHandler}>Refresh Posts</button> */}
                {/* {!arePostsNull && showPagination && <div className="w-full flex justify-center"><Pagination postsCount={postsCount} pageNumber={pageNumber} setPageNumber={setPageNumber}/></div>} */}
                
            </div>
        </div>
    );
};

export default ReferralRequestPosts;
