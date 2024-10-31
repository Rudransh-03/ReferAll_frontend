import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { ReferPostState, referPostActions } from "../../store/referRequests-slice";
import ReferTable from "./ReferTable/ReferTable";
import Filters from "./Filters/Filters";
import Pagination from "../Pagination";

const ReferralRequestPosts = () => {
    const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const data: ReferPostState[] = useSelector((state: RootState) => state.referPosts);

    const [fetching, setFetching] = useState(0);
    const [arePostsNull, setArePostsNull] = useState<boolean>(false);
    const [postsCount, setPostsCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [showPagination, setShowPagination] = useState<boolean>(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/getPaginatedPostsByCompany/${companyName}?pageNumber=${pageNumber}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                // if(response.data.length == 0) console.log("hi");
                dispatch(referPostActions.setReferPostObjects(response.data));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        const fetchTotaPostsCount = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/posts/getTotalPostsCountByCompany/${companyName}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                setPostsCount(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTotaPostsCount();
    }, []);

    function clickHandler(){
        setFetching((fetching+1) / 2)
      }

    return (
        <div className="w-screen">
            <div className="w-full mt-44">
                <div className="w-full text-center text-5xl h-16 font-semibold">REFER PEOPLE TO <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">{companyName.toUpperCase()}</span></div>
                <div className="w-full flex justify-center">
                    <Filters setArePostsNull={setArePostsNull} setShowPagination={setShowPagination} setPageNumber={setPageNumber}/>
                </div>
                {arePostsNull && <div className="mt-4 mb-4 text-2xl font-seimibold text-indigo-700 w-full flex justify-center">No posts found!!</div>}
                {!arePostsNull && <div className="w-full flex justify-center">
                    <ReferTable data={data}/>
                </div>}
                {/* <button className="ml-36 px-4 py-2 shadow-indigo-600 text-white rounded-lg bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer" onClick={clickHandler}>Refresh Posts</button> */}
                {!arePostsNull && showPagination && <div className="w-full flex justify-center"><Pagination postsCount={postsCount} pageNumber={pageNumber} setPageNumber={setPageNumber}/></div>}
                
            </div>
        </div>
    );
};

export default ReferralRequestPosts;
